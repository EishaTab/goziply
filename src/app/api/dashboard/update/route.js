import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { rates } from "@/app/data/rates";

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    console.log("🔍 DEBUG - Received update data:", { 
      skills: body.skills,
      skillsType: typeof body.skills,
      skillsLength: body.skills?.length,
      city: body.city,
      identityVerification: body.identityVerification,
      availabilityTiming: body.availabilityTiming,
      workingHours: body.workingHours // NEW: Log working hours
    });

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("🔍 DEBUG - User before update:", {
      currentSkills: user.skills,
      currentCity: user.city,
      currentAvailabilityTiming: user.availabilityTiming,
      currentWorkingHours: user.workingHours // NEW
    });

    // --- 🔐 Password Update ---
    if (body.newPassword) {
      if (!body.currentPassword) {
        return NextResponse.json(
          { error: "Current password required." },
          { status: 400 }
        );
      }

      const isValid = await bcrypt.compare(body.currentPassword, user.password);
      if (!isValid)
        return NextResponse.json(
          { error: "Incorrect current password." },
          { status: 400 }
        );

      if (body.newPassword.length < 8)
        return NextResponse.json(
          { error: "Password must be at least 8 characters." },
          { status: 400 }
        );

      const isSamePassword = await bcrypt.compare(
        body.newPassword,
        user.password
      );
      if (isSamePassword)
        return NextResponse.json(
          { error: "New password cannot be same as current." },
          { status: 400 }
        );

      const hashed = await bcrypt.hash(body.newPassword, 10);
      user.password = hashed;
    }

    // --- 🧩 Two-Factor Auth ---
    if (typeof body.twoFA === "boolean") {
      user.twoFA = body.twoFA;
    }

    // --- 📝 Profile Updates ---
    const editableFields = [
      "firstName",
      "lastName",
      "username",
      "phone",
      "profileImage",
      "city",
      "category",
      "bio",
      "availability",
      "identityVerification",
      // Add availabilityTiming and workingHours to editable fields
      "availabilityTiming",
      "workingHours" // NEW
    ];

    for (const field of editableFields) {
      if (body[field] !== undefined) {
        console.log(`🔄 Updating ${field}:`, body[field]);
        user[field] = body[field];
      }
    }

    // ✅ FIXED: Skills ko alag se handle karein
    if (body.skills !== undefined) {
      if (Array.isArray(body.skills)) {
        // Skills ko normalize karein - strings mein convert karein
        const normalizedSkills = body.skills.map(skill => {
          if (typeof skill === 'string') {
            return skill;
          } else if (skill && typeof skill === 'object' && skill.name) {
            return skill.name;
          }
          return skill;
        }).filter(skill => skill); // Remove any empty values
        
        user.skills = normalizedSkills;
        console.log("✅ Normalized skills:", normalizedSkills);
      } else {
        user.skills = [];
      }
    }

    // --- 🧠 Username Uniqueness Check ---
    if (body.username && body.username !== user.username) {
      const existingUser = await User.findOne({ username: body.username });
      if (existingUser) {
        return NextResponse.json(
          { error: "Username already taken." },
          { status: 400 }
        );
      }
      user.username = body.username.toLowerCase();
    }

    // --- 💰 Auto-calculate hourlyRate --- FIXED
    if (user.city && Array.isArray(user.skills) && user.skills.length > 0) {
      const cityData = rates.find((r) => r.name === user.city);
      if (cityData) {
        let total = 0;
        const skillNames = [];

        for (const skill of user.skills) {
          const skillName = typeof skill === "string" ? skill : skill?.name;
          if (skillName) {
            skillNames.push(skillName);
            total += cityData.prices[skillName] || 0;
          }
        }

        user.hourlyRate = total;
        console.log(
          "💰 Calculated hourly rate:",
          total,
          "for skills:",
          skillNames,
          "in city:",
          user.city
        );
      } else {
        console.log("❌ City data not found for:", user.city);
        user.hourlyRate = 0;
      }
    } else {
      console.log("❌ City or skills missing for hourly rate calculation");
      user.hourlyRate = 0;
    }

    // --- 🕐 NEW: Validate availabilityTiming structure ---
    if (body.availabilityTiming) {
      // Ensure proper structure with defaults
      user.availabilityTiming = {
        startWork: body.availabilityTiming.startWork || "today",
        preferredTime: Array.isArray(body.availabilityTiming.preferredTime) 
          ? body.availabilityTiming.preferredTime 
          : ["morning", "afternoon", "evening"],
        availableDays: Array.isArray(body.availabilityTiming.availableDays)
          ? body.availabilityTiming.availableDays
          : ["monday", "tuesday", "wednesday", "thursday", "friday"]
      };
      console.log("✅ Updated availabilityTiming:", user.availabilityTiming);
    }

    // --- ⏰ NEW: Validate workingHours structure ---
    if (body.workingHours) {
      // Calculate total hours per week if not provided
      const hoursPerDay = body.workingHours.hoursPerDay || 8;
      const daysPerWeek = body.workingHours.daysPerWeek || 5;
      const totalHoursPerWeek = hoursPerDay * daysPerWeek;

      // Ensure proper structure with defaults
      user.workingHours = {
        hoursPerDay: hoursPerDay,
        daysPerWeek: daysPerWeek,
        totalHoursPerWeek: totalHoursPerWeek
      };
      console.log("✅ Updated workingHours:", user.workingHours);
    }

    await user.save();

    console.log("✅ User after save:", { 
      skills: user.skills,
      skillsLength: user.skills?.length,
      hourlyRate: user.hourlyRate,
      city: user.city,
      availabilityTiming: user.availabilityTiming,
      workingHours: user.workingHours // NEW
    });

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("❌ Update user error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}