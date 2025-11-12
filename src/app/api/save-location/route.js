import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Task from "@/app/models/Task";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const task = await Task.create({
      title: body.title,
      location: {
        type: "Point",
        coordinates: [body.lon, body.lat], // GeoJSON expects [lon, lat]
      },
    });

    return NextResponse.json({ success: true, task });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
