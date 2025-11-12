"use client";

import { useState, useEffect, useRef } from "react";
import {
  Edit,
  Save,
  X,
  CheckCircle,
  Trash2,
  Camera,
  Upload,
  PlusCircle,
  Calendar,
  Clock,
  Watch,
} from "lucide-react";
import { useSession } from "next-auth/react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import imageCompression from "browser-image-compression";
import { motion, AnimatePresence } from "framer-motion";
import { rates } from "@/app/data/rates";

export default function ProfileDetails() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState(null);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [currentRate, setCurrentRate] = useState(null);
  const [availableSkills, setAvailableSkills] = useState([]);

  // Crop states for profile picture
  const [upImg, setUpImg] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const imgRef = useRef(null);

  // ID image states
  const [idUpImg, setIdUpImg] = useState(null);
  const [idCrop, setIdCrop] = useState();
  const [idCompletedCrop, setIdCompletedCrop] = useState(null);
  const [idPreviewUrl, setIdPreviewUrl] = useState("");
  const idImgRef = useRef(null);

  // Helper: enrich data
  const enrichProfileData = (userData) => {
    const cityData = rates.find((r) => r.name === userData.city);
    
    const skillsWithRates = userData.skills?.map((skillName) => {
      const skillRate = cityData?.prices[skillName] || 0;
      return {
        name: skillName,
        rate: skillRate,
      };
    }) || [];
    
    return {
      ...userData,
      skills: skillsWithRates,
      bio: userData.bio || "",
      profileImage: userData.profileImage || "/d_avatar.png",
      identityVerification: userData.identityVerification || {},
      // Add availability timing with defaults
      availabilityTiming: userData.availabilityTiming || {
        startWork: "today",
        preferredTime: ["morning", "afternoon", "evening"],
        availableDays: ["monday", "tuesday", "wednesday", "thursday", "friday"]
      },
      // Add working hours with defaults
      workingHours: userData.workingHours || {
        hoursPerDay: 8,
        daysPerWeek: 5,
        totalHoursPerWeek: 40
      }
    };
  };

  // Load profile
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/dashboard/profile");
        const data = await res.json();
        console.log("🔍 Loaded profile data:", data);
        const enriched = enrichProfileData(data.user);
        setProfile(enriched);
        setOriginalProfile(enriched);
        setSelectedCity(data.user.city || "");
        
        // Set previews if exist
        if (data.user.profileImage) {
          setPreviewUrl(data.user.profileImage);
        }
        if (data.user.identityVerification?.idImageFront) {
          setIdPreviewUrl(data.user.identityVerification.idImageFront);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    }
    if (session?.user?.id) loadProfile();
  }, [session]);

  // Handle city/skills
  useEffect(() => {
    if (selectedCity) {
      const cityData = rates.find((r) => r.name === selectedCity);
      if (cityData) {
        const userSkillNames = profile?.skills.map((s) => s.name) || [];
        const skills = Object.keys(cityData.prices).filter(
          (s) => !userSkillNames.includes(s)
        );
        setAvailableSkills(skills);
        setCurrentRate(selectedSkill ? cityData.prices[selectedSkill] : null);
        
        // Update existing skills rates when city changes
        if (profile && profile.skills.length > 0) {
          const updatedSkills = profile.skills.map(skill => ({
            ...skill,
            rate: cityData.prices[skill.name] || 0
          }));
          setProfile(prev => ({ ...prev, skills: updatedSkills }));
        }
      }
    } else {
      setAvailableSkills([]);
      setCurrentRate(null);
    }

    if (profile && profile.city !== selectedCity) {
      setProfile((prev) => ({ ...prev, city: selectedCity }));
    }
  }, [selectedCity, selectedSkill, profile]);

  // Profile Picture Crop Logic
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(String(reader.result)));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // ID Picture Select Logic
  const onSelectIdFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setIdUpImg(String(reader.result)));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop(
      centerCrop(makeAspectCrop({ unit: "%", width: 90 }, 1, width, height), width, height)
    );
  };

  // ID Image Load
  const onIdImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setIdCrop(
      centerCrop(makeAspectCrop({ unit: "%", width: 90 }, 1, width, height), width, height)
    );
  };

  const generateCroppedImage = async (image, crop, isIdImage = false) => {
    if (!crop?.width || !crop?.height) return;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.9)
    );
    const compressedBlob = await imageCompression(blob, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1000,
      useWebWorker: true,
    });
    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressedBlob);
      reader.onloadend = () => resolve(reader.result);
    });

    if (isIdImage) {
      setIdPreviewUrl(base64);
      setIdUpImg(null);
      setProfile((prev) => ({
        ...prev,
        identityVerification: { 
          ...prev.identityVerification,
          idImageFront: base64 
        },
      }));
    } else {
      setProfile((prev) => ({ ...prev, profileImage: base64 }));
      setPreviewUrl(base64);
      setUpImg(null);
    }
  };

  // Save function - Manual save only
  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      
      // Debug: Check current profile state
      console.log("🔍 FRONTEND - Current profile:", {
        skills: profile.skills,
        skillsLength: profile.skills?.length,
        city: selectedCity,
        availabilityTiming: profile.availabilityTiming,
        workingHours: profile.workingHours
      });
      
      // Prepare payload - Ensure skills are sent as strings
      const payload = {
        ...profile,
        skills: profile.skills.map((s) => s.name), // Convert to string array
        city: selectedCity,
        profileImage: profile.profileImage,
        identityVerification: profile.identityVerification,
        availabilityTiming: profile.availabilityTiming,
        workingHours: profile.workingHours,
      };

      console.log("🔍 FRONTEND - Sending payload:", {
        skills: payload.skills,
        skillsLength: payload.skills?.length,
        city: payload.city,
        identityVerification: payload.identityVerification,
        availabilityTiming: payload.availabilityTiming,
        workingHours: payload.workingHours
      });

      const res = await fetch("/api/dashboard/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();
      console.log("🔍 FRONTEND - API Response:", responseData);

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      const enriched = enrichProfileData(responseData.user);
      setProfile(enriched);
      setOriginalProfile(enriched);
      setIsEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      console.error("❌ Save failed:", err);
      alert('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setIsEditing(false);
    setSelectedCity(originalProfile.city || "");
    setSelectedSkill("");
    setPreviewUrl(originalProfile.profileImage || "");
    setIdPreviewUrl(originalProfile.identityVerification?.idImageFront || "");
    setUpImg(null);
    setIdUpImg(null);
  };

  const handleAddSkill = () => {
    if (!selectedSkill || currentRate === null) return;
    const newSkill = { name: selectedSkill, rate: currentRate };
    setProfile((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), newSkill],
    }));
    setSelectedSkill("");
    setCurrentRate(null);
  };

  const handleRemoveSkill = (skillName) =>
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.name !== skillName),
    }));

  // Availability timing handlers
  const handleTimeToggle = (time) => {
    const currentTimes = profile.availabilityTiming?.preferredTime || [];
    let newTimes;
    if (currentTimes.includes(time)) {
      newTimes = currentTimes.filter(t => t !== time);
    } else {
      newTimes = [...currentTimes, time];
    }
    setProfile(prev => ({
      ...prev,
      availabilityTiming: {
        ...prev.availabilityTiming,
        preferredTime: newTimes
      }
    }));
  };

  const handleDayToggle = (day) => {
    const currentDays = profile.availabilityTiming?.availableDays || [];
    let newDays;
    if (currentDays.includes(day)) {
      newDays = currentDays.filter(d => d !== day);
    } else {
      newDays = [...currentDays, day];
    }
    setProfile(prev => ({
      ...prev,
      availabilityTiming: {
        ...prev.availabilityTiming,
        availableDays: newDays
      }
    }));
  };

  // Working hours handlers
  const handleWorkingHoursChange = (field, value) => {
    const numValue = parseInt(value) || 0;
    setProfile(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [field]: numValue
      }
    }));
  };

  // Calculate total hours per week automatically
  useEffect(() => {
    if (profile?.workingHours) {
      const hoursPerDay = profile.workingHours.hoursPerDay || 0;
      const daysPerWeek = profile.workingHours.daysPerWeek || 0;
      const totalHoursPerWeek = hoursPerDay * daysPerWeek;
      
      setProfile(prev => ({
        ...prev,
        workingHours: {
          ...prev.workingHours,
          totalHoursPerWeek: totalHoursPerWeek
        }
      }));
    }
  }, [profile?.workingHours?.hoursPerDay, profile?.workingHours?.daysPerWeek]);

  const totalHourlyRate =
    profile?.skills.reduce((sum, s) => sum + (s.rate || 0), 0) || 0;

  if (!profile)
    return (
      <p className="text-center py-10 text-slate-500">Loading profile...</p>
    );

  return (
    <div className="space-y-8 relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* ✅ Success Toast */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 right-0 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-md flex items-center gap-2 shadow-sm z-10"
          >
            <CheckCircle size={18} /> Profile updated successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50"
          >
            <Edit size={16} /> Edit
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50"
            >
              <X size={16} /> Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              disabled={loading}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-white bg-slate-800 hover:bg-slate-900 transition ${
                loading && "opacity-70 cursor-not-allowed"
              }`}
            >
              <Save size={16} /> {loading ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>

      {/* Profile Picture Section */}
      <div className="bg-gradient-to-t from-gray-50 to-gray-200 p-6 rounded-lg border border-slate-200 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Profile Picture</h3>
        <div className="relative inline-block">
          <img
            src={previewUrl || profile.profileImage || "/d_avatar.png"}
            alt="Profile"
            className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-full border-8 border-slate-200 shadow-md mx-auto"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-slate-800 p-2 rounded-full cursor-pointer hover:bg-slate-600 transition">
              <Camera className="text-white w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onSelectFile}
              />
            </label>
          )}
        </div>
        
        {/* Crop Modal for Profile Picture */}
        {upImg && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Crop Profile Picture</h3>
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
                className="max-h-96"
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={upImg}
                  onLoad={onImageLoad}
                  className="max-w-full"
                />
              </ReactCrop>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setUpImg(null);
                    setCrop(undefined);
                  }}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => generateCroppedImage(imgRef.current, completedCrop, false)}
                  className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-900"
                >
                  Apply Crop
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Bio Section - NEWLY ADDED */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Bio</h3>
        {isEditing ? (
          <textarea
            value={profile.bio || ""}
            onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
            placeholder="Tell us about yourself, your experience, and what makes you great at your work..."
            className="w-full border border-slate-200 rounded-md p-3 min-h-[120px] resize-vertical"
            rows={4}
          />
        ) : (
          <div className="text-slate-700 p-3 bg-slate-50 rounded-md min-h-[120px]">
            {profile.bio || (
              <p className="text-slate-500 italic">No bio added yet. Click Edit to add a bio.</p>
            )}
          </div>
        )}
      </div>

      {/* ✅ ID Upload Section */}
      <div className="bg-gradient-to-t from-gray-50 to-gray-200 p-6 rounded-lg border border-slate-200 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Government ID / License</h3>
        <div className="relative inline-block">
          <img
            src={idPreviewUrl || "/id_placeholder.png"}
            alt="ID Preview"
            className="w-64 h-40 object-contain border-4 border-slate-200 rounded-lg shadow-md bg-white mx-auto"
          />
          {isEditing && (
            <label className="absolute bottom-2 right-2 bg-slate-800 p-2 rounded-full cursor-pointer hover:bg-slate-600 transition">
              <Camera className="text-white w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onSelectIdFile}
              />
            </label>
          )}
        </div>
        {idPreviewUrl && (
          <p className="text-sm text-green-600 mt-2">✓ ID image ready to save</p>
        )}
        
        {/* Crop Modal for ID Picture */}
        {idUpImg && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Crop ID Picture</h3>
              <ReactCrop
                crop={idCrop}
                onChange={(_, percentCrop) => setIdCrop(percentCrop)}
                onComplete={(c) => setIdCompletedCrop(c)}
                aspect={1}
                className="max-h-96"
              >
                <img
                  ref={idImgRef}
                  alt="Crop ID"
                  src={idUpImg}
                  onLoad={onIdImageLoad}
                  className="max-w-full"
                />
              </ReactCrop>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setIdUpImg(null);
                    setIdCrop(undefined);
                  }}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => generateCroppedImage(idImgRef.current, idCompletedCrop, true)}
                  className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-900"
                >
                  Apply Crop
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Working Hours Section */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <Watch size={20} /> Working Hours
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hours Per Day */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Hours Per Day
            </label>
            {isEditing ? (
              <select
                value={profile.workingHours?.hoursPerDay || 8}
                onChange={(e) => handleWorkingHoursChange('hoursPerDay', e.target.value)}
                className="w-full border border-slate-200 rounded-md p-2"
              >
                {[4, 6, 8, 10, 12].map(hours => (
                  <option key={hours} value={hours}>
                    {hours} hours
                  </option>
                ))}
              </select>
            ) : (
              <div className="flex items-center gap-2 text-slate-700 p-2 bg-slate-50 rounded-md">
                <Clock size={16} />
                <span className="font-medium">
                  {profile.workingHours?.hoursPerDay || 8} hours/day
                </span>
              </div>
            )}
          </div>

          {/* Days Per Week */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Days Per Week
            </label>
            {isEditing ? (
              <select
                value={profile.workingHours?.daysPerWeek || 5}
                onChange={(e) => handleWorkingHoursChange('daysPerWeek', e.target.value)}
                className="w-full border border-slate-200 rounded-md p-2"
              >
                {[1, 2, 3, 4, 5, 6, 7].map(days => (
                  <option key={days} value={days}>
                    {days} days
                  </option>
                ))}
              </select>
            ) : (
              <div className="flex items-center gap-2 text-slate-700 p-2 bg-slate-50 rounded-md">
                <Calendar size={16} />
                <span className="font-medium">
                  {profile.workingHours?.daysPerWeek || 5} days/week
                </span>
              </div>
            )}
          </div>

          {/* Total Hours Per Week (Auto-calculated) */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Total Hours Per Week
            </label>
            <div className="flex items-center gap-2 text-slate-700 p-2 bg-blue-50 rounded-md border border-blue-200">
              <Watch size={16} className="text-blue-600" />
              <span className="font-bold text-blue-700">
                {profile.workingHours?.totalHoursPerWeek || 40} hours/week
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 text-center">
              Automatically calculated
            </p>
          </div>
        </div>

        {/* Weekly Schedule Summary */}
        {!isEditing && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-700 text-center">
              <strong>Weekly Schedule:</strong> {profile.workingHours?.hoursPerDay || 8} hours/day × {profile.workingHours?.daysPerWeek || 5} days = <strong>{profile.workingHours?.totalHoursPerWeek || 40} hours/week</strong>
            </p>
          </div>
        )}
      </div>

      {/* ✅ Availability Timing Section */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <Clock size={20} /> Availability Timing
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* When can you start work? */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              When can you start work?
            </label>
            {isEditing ? (
              <select
                value={profile.availabilityTiming?.startWork || "today"}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  availabilityTiming: {
                    ...prev.availabilityTiming,
                    startWork: e.target.value
                  }
                }))}
                className="w-full border border-slate-200 rounded-md p-2"
              >
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="in_one_week">In One Week</option>
              </select>
            ) : (
              <div className="flex items-center gap-2 text-slate-700 p-2 bg-slate-50 rounded-md">
                <Calendar size={16} />
                <span className="capitalize font-medium">
                  {profile.availabilityTiming?.startWork === "in_one_week" ? "In One Week" : 
                   profile.availabilityTiming?.startWork || "Today"}
                </span>
              </div>
            )}
          </div>

          {/* Preferred Time Slots */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Preferred Time Slots
            </label>
            {isEditing ? (
              <div className="space-y-2">
                {["morning", "afternoon", "evening"].map((time) => (
                  <label key={time} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.availabilityTiming?.preferredTime?.includes(time) || false}
                      onChange={() => handleTimeToggle(time)}
                      className="rounded border-slate-300 text-slate-800 focus:ring-slate-800"
                    />
                    <span className="capitalize text-slate-700">{time}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.availabilityTiming?.preferredTime?.map((time) => (
                  <span
                    key={time}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize"
                  >
                    {time}
                  </span>
                ))}
                {(!profile.availabilityTiming?.preferredTime || profile.availabilityTiming.preferredTime.length === 0) && (
                  <span className="text-slate-500 text-sm">No preferred times set</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Available Days */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Available Days
          </label>
          {isEditing ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                <label key={day} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.availabilityTiming?.availableDays?.includes(day) || false}
                    onChange={() => handleDayToggle(day)}
                    className="rounded border-slate-300 text-slate-800 focus:ring-slate-800"
                  />
                  <span className="capitalize text-slate-700 text-sm">
                    {day.slice(0, 3)}
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.availabilityTiming?.availableDays?.map((day) => (
                <span
                  key={day}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize"
                >
                  {day.slice(0, 3)}
                </span>
              ))}
              {(!profile.availabilityTiming?.availableDays || profile.availabilityTiming.availableDays.length === 0) && (
                <span className="text-slate-500 text-sm">No available days set</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-700">
            Skills & Services
          </h3>
          {!isEditing && profile.city && (
            <div className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              Working in: <b>{profile.city}</b>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {profile.skills?.length > 0 ? (
            profile.skills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-full"
              >
                {skill.name} -{" "}
                <span className="font-bold text-slate-800 ml-1">
                  ${skill.rate}/hr
                </span>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveSkill(skill.name)}
                    className="ml-2 text-slate-500 hover:text-red-500 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No skills added yet.</p>
          )}
        </div>

        {isEditing && (
          <div className="mt-6 space-y-4 pt-4 border-t border-slate-200">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Select your city
              </label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setSelectedSkill("");
                }}
                className="w-full border border-slate-200 rounded-md p-2"
              >
                <option value="">-- Select a City --</option>
                {rates.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCity && (
              <>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Select a skill to add
                </label>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full border border-slate-200 rounded-md p-2"
                >
                  <option value="">-- Select a Skill --</option>
                  {availableSkills.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill} - ${rates.find(r => r.name === selectedCity)?.prices[skill] || 0}/hr
                    </option>
                  ))}
                </select>

                {selectedSkill && currentRate !== null && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 p-3 rounded-md border border-slate-200 mt-2 gap-3">
                    <p className="text-sm font-medium text-slate-700">
                      Suggested Rate:{" "}
                      <span className="text-lg font-bold text-slate-900">
                        ${currentRate}/hr
                      </span>
                    </p>
                    <button
                      onClick={handleAddSkill}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-slate-800 text-white rounded-md hover:bg-slate-900 w-full sm:w-auto"
                    >
                      <PlusCircle size={16} /> Add Skill
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Total Rate */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">
          Total Earning Potential
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-slate-600">
            Total Hourly Rate
          </p>
          <p className="text-3xl font-bold text-green-600">
            ${totalHourlyRate.toFixed(2)}/hr
          </p>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Based on your selected skills and city rates
        </p>
        
        {/* Weekly Earning Potential */}
        {profile?.workingHours?.totalHoursPerWeek && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-slate-600">
                Weekly Earning Potential
              </p>
              <p className="text-2xl font-bold text-blue-600">
                ${(totalHourlyRate * (profile.workingHours.totalHoursPerWeek || 40)).toFixed(2)}/week
              </p>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Based on {profile.workingHours.totalHoursPerWeek} hours/week
            </p>
          </div>
        )}
      </div>
    </div>
  );
}