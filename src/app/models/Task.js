import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  person: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point", // ✅ auto "Point"
    },
    coordinates: {
      type: [Number], // [lon, lat]
      required: true,
    },
  },
});

// ✅ Geospatial index
TaskSchema.index({ location: "2dsphere" });

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
