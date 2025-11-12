import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // 👤 Basic Information
    firstName: { 
      type: String, 
      required: true, 
      trim: true, 
      maxlength: 50 
    },
    lastName: { 
      type: String, 
      required: true, 
      trim: true, 
      maxlength: 50 
    },
    username: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      lowercase: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    countryCode: { 
      type: String, 
      required: true 
    },
    phone: { 
      type: String, 
      required: true, 
      trim: true 
    },

    // 💡 Role for Authorization
    role: {
      type: String,
      enum: ["customer", "tasker", "admin"],
      default: "tasker",
    },

    password: { 
      type: String, 
      required: true, 
      minlength: 8 
    },
    zipCode: { 
      type: String, 
      trim: true 
    },

    // ✅ Account Verification
    isVerified: { 
      type: Boolean, 
      default: false 
    }, // Controlled by identity verification
    isApproved: { 
      type: Boolean, 
      default: false 
    }, // Admin approval for taskers
    otp: { 
      type: String 
    },
    otpExpiresAt: { 
      type: Date 
    },

    // 🧰 Tasker Details
    city: { 
      type: String 
    },
    skills: { 
      type: [{ 
        type: String, 
        trim: true 
      }], 
      default: [] 
    },
    availability: { 
      type: Boolean, 
      default: true 
    },
    bio: { 
      type: String, 
      trim: true 
    },

    // --- AVAILABILITY TIMING FIELDS ---
    availabilityTiming: {
      startWork: {
        type: String,
        enum: ["today", "tomorrow", "in_one_week"],
        default: "today"
      },
      preferredTime: {
        type: [{
          type: String,
          enum: ["morning", "afternoon", "evening"]
        }],
        default: ["morning", "afternoon", "evening"]
      },
      availableDays: {
        type: [{
          type: String,
          enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        }],
        default: ["monday", "tuesday", "wednesday", "thursday", "friday"]
      }
    },

    // --- WORKING HOURS FIELDS ---
    workingHours: {
      hoursPerDay: {
        type: Number,
        min: 1,
        max: 24,
        default: 8
      },
      daysPerWeek: {
        type: Number,
        min: 1,
        max: 7,
        default: 5
      },
      totalHoursPerWeek: {
        type: Number,
        min: 1,
        max: 168, // 24 hours * 7 days
        default: 40
      }
    },

    // --- PROFESSIONAL DETAILS ---
    hourlyRate: { 
      type: Number, 
      default: 0 
    },
    rating: { 
      type: Number, 
      default: 0, 
      min: 0, 
      max: 5 
    },
    reviewsCount: { 
      type: Number, 
      default: 0 
    },

    // 🖼️ Profile Image
    profileImage: { 
      type: String 
    },

    // 🔐 Security Settings
    twoFA: { 
      type: Boolean, 
      default: false 
    },
    twoFASecret: { 
      type: String 
    },

    // 🪪 IDENTITY VERIFICATION FIELDS
    identityVerification: {
      idType: {
        type: String,
        enum: ["CNIC", "Passport", "DriverLicense", "Other"],
        default: "CNIC",
      },
      idNumber: { 
        type: String, 
        trim: true 
      },
      idImageFront: { 
        type: String 
      }, // URL/path of uploaded front image
      idImageBack: { 
        type: String 
      },  // URL/path of uploaded back image
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
      verifiedAt: { 
        type: Date 
      },
    },

    // ⏰ Admin Approval Tracking
    approvedAt: { 
      type: Date 
    }, // When admin approved the tasker
    approvedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    } // Which admin approved
  },
  { 
    timestamps: true 
  }
);

// Add indexes for better performance when querying taskers
userSchema.index({ role: 1, isApproved: 1, availability: 1 });
userSchema.index({ "availabilityTiming.preferredTime": 1 });
userSchema.index({ "availabilityTiming.availableDays": 1 });
userSchema.index({ "workingHours.totalHoursPerWeek": 1 });
userSchema.index({ city: 1 });
userSchema.index({ skills: 1 });

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Method to check if user is available for specific time and day
userSchema.methods.isAvailableAt = function(time, day) {
  if (!this.availabilityTiming) return false;
  
  const hasTime = this.availabilityTiming.preferredTime.includes(time);
  const hasDay = this.availabilityTiming.availableDays.includes(day);
  
  return hasTime && hasDay;
};

// Method to calculate weekly earning potential
userSchema.methods.getWeeklyEarningPotential = function() {
  return (this.hourlyRate || 0) * (this.workingHours?.totalHoursPerWeek || 40);
};

// Method to check if user can start work by specific date
userSchema.methods.canStartBy = function(date) {
  const today = new Date();
  const targetDate = new Date(date);
  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  switch(this.availabilityTiming?.startWork) {
    case "today":
      return diffDays <= 0;
    case "tomorrow":
      return diffDays <= 1;
    case "in_one_week":
      return diffDays <= 7;
    default:
      return diffDays <= 0;
  }
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;