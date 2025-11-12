import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User";
import AvailabilityProfile from "@/app/models/AvailabilityProfile";

// GET all availability profiles for the logged-in user
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const profiles = await AvailabilityProfile.find({ user: session.user.id }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, profiles });
  } catch (err) {
    console.error("Get availability error:", err);
    return NextResponse.json({ error: "Server error while fetching profiles." }, { status: 500 });
  }
}

// POST a new availability profile
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await connectDB();
    const user = await User.findById(session.user.id);
    if (!user || !user.city) return NextResponse.json({ error: "Please set your primary work city first." }, { status: 400 });
    const { locationData, availabilityData } = await req.json();
    if (locationData.city !== user.city) return NextResponse.json({ error: `You can only add a location within your primary city: ${user.city}.` }, { status: 400 });

    const existingProfile = await AvailabilityProfile.findOne({ user: session.user.id, skill: availabilityData.skill });
    if (existingProfile) {
        return NextResponse.json({ error: `You already have a profile for the skill "${availabilityData.skill}".` }, { status: 409 });
    }

    const newProfile = await AvailabilityProfile.create({
      user: session.user.id,
      fullAddress: locationData.fullAddress,
      city: locationData.city,
      location: { type: "Point", coordinates: [locationData.coordinates.lng, locationData.coordinates.lat] },
      ...availabilityData
    });
    return NextResponse.json({ success: true, profile: newProfile }, { status: 201 });
  } catch (err) {
    console.error("Create availability error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

// PUT to update an existing profile
export async function PUT(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectDB();
        const { profileId, locationData, availabilityData } = await req.json();
        
        const profileToUpdate = await AvailabilityProfile.findById(profileId);
        if (!profileToUpdate) return NextResponse.json({ error: "Profile not found." }, { status: 404 });
        if (profileToUpdate.user.toString() !== session.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

        // ✨ --- THIS IS THE FIX --- ✨
        // Check if the new skill is already used by ANOTHER profile.
        // We exclude the current profile from the search.
        const existingSkillProfile = await AvailabilityProfile.findOne({ 
            user: session.user.id, 
            skill: availabilityData.skill,
            _id: { $ne: profileId } // $ne means "not equal to"
        });
        if (existingSkillProfile) {
            return NextResponse.json({ error: `You already have another profile using the skill "${availabilityData.skill}".` }, { status: 409 });
        }
        
        // Update fields
        profileToUpdate.fullAddress = locationData.fullAddress;
        profileToUpdate.city = locationData.city;
        profileToUpdate.location = { type: "Point", coordinates: [locationData.coordinates.lng, locationData.coordinates.lat] };
        profileToUpdate.workScope = availabilityData.workScope;
        profileToUpdate.workDays = availabilityData.workDays;
        profileToUpdate.skill = availabilityData.skill;
        profileToUpdate.workDetails = availabilityData.workDetails;
        
        await profileToUpdate.save();
        return NextResponse.json({ success: true, profile: profileToUpdate });
    } catch(err) {
        console.error("Update availability error:", err);
        return NextResponse.json({ error: "Server error while updating." }, { status: 500 });
    }
}

// DELETE an availability profile
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { profileId } = await req.json();
    if (!profileId) return NextResponse.json({ error: "Profile ID is required." }, { status: 400 });
    await connectDB();
    const profileToDelete = await AvailabilityProfile.findById(profileId);
    if (!profileToDelete) return NextResponse.json({ error: "Profile not found." }, { status: 404 });
    if (profileToDelete.user.toString() !== session.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    await AvailabilityProfile.findByIdAndDelete(profileId);
    return NextResponse.json({ success: true, message: "Profile deleted." });
  } catch (err) {
    console.error("Delete availability error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

