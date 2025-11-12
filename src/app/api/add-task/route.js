import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Task from "@/app/models/Task";

export async function POST(req) {
  try {
    await connectDB();

    const { title, person, lat, lon } = await req.json();

    if (!title || !person || !lat || !lon) {
      return NextResponse.json(
        { success: false, error: "title, person, lat, lon required" },
        { status: 400 }
      );
    }

    const newTask = await Task.create({
      title,
      person,
      location: {
        coordinates: [lon, lat], // ✅ ensure order is lon, lat
      },
    });

    return NextResponse.json({ success: true, task: newTask });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
