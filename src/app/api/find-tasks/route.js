import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Task from "@/app/models/Task";

export async function POST(req) {
  try {
    await connectDB();
    const { lat, lon, title } = await req.json();

    if (!lat || !lon) {
      return NextResponse.json(
        { success: false, error: "lat and lon required" },
        { status: 400 }
      );
    }

    const filters = {};
    if (title) filters.title = new RegExp(title, "i");

    const tasks = await Task.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [lon, lat] }, // ✅ [lon, lat]
          distanceField: "distance",
          maxDistance: 200000, // 200 km
          spherical: true,
          query: filters,
        },
      },
      { $limit: 50 },
    ]);

    return NextResponse.json({ success: true, tasks });
  } catch (err) {
    console.error("find-tasks error:", err); // ✅ log full error
    return NextResponse.json(
      { success: false, error: err.message, stack: err.stack },
      { status: 500 }
    );
  }
}
