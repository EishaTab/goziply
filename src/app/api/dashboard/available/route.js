import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import AvailabilityProfile from "@/app/models/AvailabilityProfile";
import mongoose from "mongoose";

const getCurrentDay = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
};

export async function GET(req) {
  try {
    await connectDB();
    const currentDay = getCurrentDay();
    const { searchParams } = new URL(req.url);
    const skillQuery = searchParams.get('skill');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    const pipeline = [];

    // --- Geospatial Query Logic ---
    if (lat && lng) {
        // If location is provided, $geoNear MUST be the first stage.
        // It finds documents near the specified point and calculates distance.
        const geoNearStage = {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [parseFloat(lng), parseFloat(lat)] // [longitude, latitude]
                },
                distanceField: "distance", // Output field with distance in meters
                maxDistance: 200 * 1000, // 200km in meters
                query: { workDays: currentDay }, // Filter by current day within the radius
                spherical: true
            }
        };
        pipeline.push(geoNearStage);

        // Add skill filter if it exists
        if (skillQuery) {
            pipeline.push({ $match: { skill: { $regex: skillQuery, $options: 'i' } } });
        }

    } else {
        // Fallback for non-geospatial search
        const matchStage = { workDays: currentDay };
        if (skillQuery) {
            matchStage.skill = { $regex: skillQuery, $options: 'i' };
        }
        pipeline.push({ $match: matchStage });
    }

    // --- Common Pipeline Stages ---
    pipeline.push({ $lookup: { from: "users", localField: "user", foreignField: "_id", as: "userDetails" } });
    pipeline.push({ $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } });
    pipeline.push({
        $project: {
            _id: 1, fullAddress: 1, city: 1, skill: 1, workScope: 1, workDays: 1,
            distance: { $ifNull: ["$distance", null] }, // Include distance if it exists
            user: {
                firstName: "$userDetails.firstName",
                lastName: "$userDetails.lastName",
                profileImage: "$userDetails.profileImage",
                bio: "$userDetails.bio"
            }
        }
    });

    const availableUsers = await AvailabilityProfile.aggregate(pipeline);

    // Convert distance from meters to kilometers
    const resultsWithKm = availableUsers.map(user => {
        if (user.distance !== null) {
            user.distanceInKm = (user.distance / 1000).toFixed(1);
        }
        delete user.distance; // Clean up the original distance field
        return user;
    });

    return NextResponse.json({ success: true, users: resultsWithKm });

  } catch (err) {
    console.error("Find available users error:", err);
    return NextResponse.json({ error: "Server error while searching for users." }, { status: 500 });
  }
}

