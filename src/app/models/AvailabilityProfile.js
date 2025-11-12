import { Schema, model, models } from "mongoose";

const pointSchema = new Schema({
  type: { type: String, enum: ['Point'], required: true },
  coordinates: { type: [Number], required: true }
});

const AvailabilityProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fullAddress: { type: String, required: true, trim: true },
  city: { type: String, required: true },
  location: { type: pointSchema, required: true, index: '2dsphere' },
  workScope: { type: [{ type: String }], default: [] },
  workDays: { type: [{ type: String }], default: [] },
  workDetails: { type: String, trim: true, maxlength: 500 },
  skill: { type: String, trim: true, required: true }, // ✨ CHANGED: Now a single, required skill
}, { timestamps: true });

const AvailabilityProfile = models.AvailabilityProfile || model("AvailabilityProfile", AvailabilityProfileSchema);

export default AvailabilityProfile;
