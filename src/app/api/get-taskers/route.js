// src/app/api/find-taskers/route.js (ya jahan bhi tum rakhna chaho)

import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { lat, lng, search, services } = body; 
    console.log('lat, lng, search, services',lat, lng, search, services)
    // lat, lng -> numbers
    // search   -> string (optional)
    // services -> array of strings (optional: e.g. ["App Development", "Graphic Design"])

    if (lat == null || lng == null) {
      return NextResponse.json(
        { success: false, error: "lat and lng required" },
        { status: 400 }
      );
    }

    // 🔍 Base filters – sirf active / approved taskers
    const filters = {
      role: "tasker",
      isVerified: true,
      availability: true,
      "location.lat": { $ne: null },
      "location.lng": { $ne: null },
    };

    // 🔤 Text search (name, city, fullAddress, skills)
    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");

      filters.$or = [
        // { firstName: regex },
        // { lastName: regex },
        // { city: regex },
        // { fullAddress: regex },
        // { "location.fullAddress": regex },
        { skills: regex }, // array field pe regex directly chalega
      ];
    }

    // 🧩 Services array (agar tum UI se selected categories bhej rahe ho)
    if (Array.isArray(services) && services.length > 0) {
      // e.g. skills: ["App Development", "Logo Development"]
      filters.skills = { $in: services };
    }

    const MAX_DISTANCE_METERS = 50000; // 15 km
    const EARTH_RADIUS_METERS = 6371000;
    
    const users = await User.aggregate([
      { $match: filters },
    
      {
        $addFields: {
          distanceMeters: {
            $let: {
              vars: {
                lat1: { $toDouble: lat },
                lon1: { $toDouble: lng },
                lat2: { $toDouble: "$location.lat" },
                lon2: { $toDouble: "$location.lng" },
              },
              in: {
                $multiply: [
                  EARTH_RADIUS_METERS,
                  {
                    $acos: {
                      $max: [
                        -1,
                        {
                          $min: [
                            1,
                            {
                              $add: [
                                {
                                  $multiply: [
                                    { $sin: { $degreesToRadians: "$$lat1" } },
                                    { $sin: { $degreesToRadians: "$$lat2" } },
                                  ],
                                },
                                {
                                  $multiply: [
                                    { $cos: { $degreesToRadians: "$$lat1" } },
                                    { $cos: { $degreesToRadians: "$$lat2" } },
                                    {
                                      $cos: {
                                        $subtract: [
                                          { $degreesToRadians: "$$lon2" },
                                          { $degreesToRadians: "$$lon1" },
                                        ],
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
    
      // 🔎 Only within 15km, and skip nulls just in case
      {
        $match: {
          distanceMeters: { $lte: MAX_DISTANCE_METERS, $ne: null },
        },
      },
    
      { $sort: { distanceMeters: 1 } },
      { $limit: 50 },
    
      {
        $project: {
          password: 0,
          twoFASecret: 0,
          otp: 0,
          otpExpiresAt: 0,
          __v: 0,
        },
      },
    ]);
    
    return NextResponse.json({
      success: true,
      users,
    });
  } catch (err) {
    console.error("find-taskers error:", err);
    return NextResponse.json(
      { success: false, error: err.message, stack: err.stack },
      { status: 500 }
    );
  }
}
