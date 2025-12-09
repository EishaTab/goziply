'use client';
import { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Calendar,
  MessageSquare,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Search,
  Plus,
  Trash2,
  Briefcase,
  Wrench,
  Tag,
  Edit,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AvailabilityManager({ session }) {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfiles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/dashboard/availability');
      if (!res.ok) throw new Error('Failed to fetch your work profiles.');
      const data = await res.json();
      setProfiles(data.profiles || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingProfile(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setEditingProfile(null);
    setShowForm(false);
  };

  const handleDelete = async (profileId) => {
    const originalProfiles = [...profiles];
    setProfiles((currentProfiles) =>
      currentProfiles.filter((p) => p._id !== profileId)
    );
    try {
      const res = await fetch('/api/dashboard/availability', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId }),
      });
      if (!res.ok) throw new Error('Failed to delete profile.');
    } catch (err) {
      setProfiles(originalProfiles);
      alert('An error occurred while deleting the profile.');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <Loader2 className="mx-auto animate-spin text-slate-500" size={32} />
      </div>
    );
  }

  if (showForm) {
    return (
      <WorkSetupForm
        session={session}
        editingProfile={editingProfile}
        profiles={profiles}
        onFormClose={handleFormClose}
        onProfileAdded={fetchProfiles}
      />
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">
          Your Work Profiles
        </h2>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 rounded-md transition duration-200 text-sm font-semibold bg-slate-800 text-white hover:bg-slate-900"
        >
          <Plus size={16} /> Add New Profile
        </button>
      </div>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      {profiles.length > 0 ? (
        <div className="space-y-4">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile._id}
              profile={profile}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
          <Briefcase className="mx-auto text-slate-400" size={48} />
          <h3 className="mt-4 text-lg font-semibold text-slate-700">
            No work profiles found.
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Click "Add New Profile" to set up your first location.
          </p>
        </div>
      )}
    </div>
  );
}

function ProfileCard({ profile, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-4 border border-slate-200 rounded-lg group hover:bg-slate-50/50 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-3 flex-grow">
          <p className="font-semibold text-slate-800 flex items-center gap-2">
            <MapPin size={14} className="text-slate-500 flex-shrink-0" />{' '}
            {profile.fullAddress}
          </p>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-sm font-bold bg-slate-800 text-white px-3 py-1 rounded-full">
              <Tag size={12} /> {profile.skill}
            </span>
          </div>
          <div className="text-xs text-slate-600 space-y-1 pt-2">
            {profile.workScope?.length > 0 && (
              <p>
                <strong>Scope:</strong> {profile.workScope.join(', ')}
              </p>
            )}
            {profile.workDays?.length > 0 && (
              <p>
                <strong>Days:</strong> {profile.workDays.join(', ')}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(profile)}
            className="p-2 text-slate-500 hover:text-blue-600"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(profile._id)}
            className="p-2 text-slate-500 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function WorkSetupForm({
  session,
  editingProfile,
  profiles,
  onFormClose,
  onProfileAdded,
}) {
  const [step, setStep] = useState(1);
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [locationData, setLocationData] = useState({
    fullAddress: '',
    city: '',
    coordinates: null,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimeout = useRef(null);
  const [availabilityData, setAvailabilityData] = useState({
    workScope: [],
    workDays: [],
    skill: '',
    workDetails: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!session?.user) return;
      try {
        const res = await fetch('/api/dashboard/profile');
        if (!res.ok) throw new Error('Could not fetch profile.');
        const data = await res.json();
        setUserProfile(data.user);
      } catch (err) {
        setError('Failed to load your user profile.');
      } finally {
        setProfileLoading(false);
      }
    }
    fetchProfile();

    if (editingProfile) {
      setLocationData({
        fullAddress: editingProfile.fullAddress,
        city: editingProfile.city,
        coordinates: {
          lng: editingProfile.location.coordinates[0],
          lat: editingProfile.location.coordinates[1],
        },
      });
      setSearchQuery(editingProfile.fullAddress);
      setAvailabilityData({
        workScope: editingProfile.workScope || [],
        workDays: editingProfile.workDays || [],
        skill: editingProfile.skill,
        workDetails: editingProfile.workDetails || '',
      });
    }
  }, [editingProfile, session]);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setError(null);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    setIsSearching(true);
    debounceTimeout.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          q: query,
          format: 'json',
          addressdetails: 1,
          limit: 5,
        });
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?${params.toString()}`
        );
        const data = await response.json();
        setSuggestions(data || []);
      } catch (err) {
        setError('Failed to fetch address suggestions.');
      } finally {
        setIsSearching(false);
      }
    }, 500);
  };

  const handleSuggestionClick = (suggestion) => {
    const suggestionCity =
      suggestion.address.city ||
      suggestion.address.town ||
      suggestion.address.village;
    if (userProfile?.city && suggestionCity !== userProfile.city) {
      setError(
        `Please select an address within your registered city: ${userProfile.city}.`
      );
      setSuggestions([]);
      return;
    }
    setLocationData({
      fullAddress: suggestion.display_name,
      city: suggestionCity,
      coordinates: {
        lat: parseFloat(suggestion.lat),
        lng: parseFloat(suggestion.lon),
      },
    });
    setSearchQuery(suggestion.display_name);
    setSuggestions([]);
  };

  const handleScopeChange = (scope) =>
    setAvailabilityData((prev) => ({
      ...prev,
      workScope: prev.workScope.includes(scope)
        ? prev.workScope.filter((s) => s !== scope)
        : [...prev.workScope, scope],
    }));
  const handleDayChange = (day) =>
    setAvailabilityData((prev) => ({
      ...prev,
      workDays: prev.workDays.includes(day)
        ? prev.workDays.filter((d) => d !== day)
        : [...prev.workDays, day],
    }));
  const handleSkillChange = (skill) =>
    setAvailabilityData((prev) => ({ ...prev, skill }));

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const isEditing = !!editingProfile;
      const url = '/api/dashboard/availability';
      const method = isEditing ? 'PUT' : 'POST';
      const payload = {
        locationData,
        availabilityData,
        ...(isEditing && { profileId: editingProfile._id }),
      };
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      await onProfileAdded();
      onFormClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const STEPS = [
    { num: 1, title: 'Location', icon: MapPin },
    { num: 2, title: 'Schedule', icon: Calendar },
    { num: 3, title: 'Skill', icon: Wrench },
    { num: 4, title: 'Details', icon: MessageSquare },
  ];
  const SCOPE_OPTIONS = [
    'Small Tasks (1-2 hours)',
    'Medium Tasks (2-4 hours)',
    'Large Projects (4+ hours)',
  ];
  const DAY_OPTIONS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const usedSkills = profiles.map((p) => p.skill);

  if (profileLoading)
    return (
      <div className="text-center p-8">
        <Loader2 className="mx-auto animate-spin text-slate-500" />
      </div>
    );
  if (!userProfile?.city)
    return (
      <div className="bg-white p-6 rounded-lg border border-red-200 w-full max-w-2xl mx-auto text-center">
        <AlertTriangle className="mx-auto text-red-500 mb-4" size={40} />
        <h2 className="text-xl font-bold text-slate-800">
          Primary City Not Set
        </h2>
        <p className="text-slate-600 mt-2">
          Please go to your main profile and set your primary work city first.
        </p>
      </div>
    );

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          {editingProfile ? 'Edit Work Profile' : 'Add New Work Profile'}
        </h2>
        <button
          onClick={onFormClose}
          className="text-sm font-semibold text-slate-600 hover:text-slate-800"
        >
          Cancel
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        {editingProfile
          ? 'Update the details for this profile.'
          : 'Create a new profile for a specific location and skill.'}
      </p>
      <div className="flex items-center space-x-2 mb-8">
        {STEPS.map((s, index) => (
          <div key={s.num} className="flex items-center w-full">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 flex-shrink-0 ${
                step >= s.num
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              {step > s.num ? <Check size={16} /> : <s.icon size={16} />}
            </div>
            <p
              className={`ml-2 text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                step >= s.num ? 'text-slate-800' : 'text-slate-500'
              }`}
            >
              {s.title}
            </p>
            {index < STEPS.length - 1 && (
              <div
                className={`h-0.5 w-full transition-colors duration-300 ml-2 ${
                  step > s.num ? 'bg-slate-800' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-slate-700"
              >
                Enter your precise work address
              </label>
              <p className="text-xs text-slate-500">
                This must be within your registered city:{' '}
                <strong>{userProfile.city}</strong>
              </p>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  id="location"
                  placeholder="Start typing your address..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full p-3 pl-10 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
                />
                {isSearching && (
                  <Loader2
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 animate-spin"
                    size={18}
                  />
                )}
              </div>
              <AnimatePresence>
                {suggestions?.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border border-slate-200 rounded-md bg-white shadow-lg mt-1 max-h-48 overflow-y-auto"
                  >
                    {suggestions.map((s) => (
                      <li
                        key={s.place_id}
                        onClick={() => handleSuggestionClick(s)}
                        className="p-3 text-sm text-slate-700 cursor-pointer hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
                      >
                        {s.display_name}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  What is the scope of work you're available for?
                </label>
                <div className="flex flex-wrap gap-2">
                  {SCOPE_OPTIONS.map((scope) => (
                    <button
                      key={scope}
                      onClick={() => handleScopeChange(scope)}
                      className={`px-4 py-2 text-sm font-medium rounded-full border-2 transition-all duration-200 ${
                        availabilityData.workScope.includes(scope)
                          ? 'bg-slate-800 text-white border-slate-800'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {scope}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Which days are you generally free?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DAY_OPTIONS.map((day) => (
                    <button
                      key={day}
                      onClick={() => handleDayChange(day)}
                      className={`px-4 py-3 text-sm font-medium rounded-md border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                        availabilityData.workDays.includes(day)
                          ? 'bg-slate-800 text-white border-slate-800'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {availabilityData.workDays.includes(day) && (
                        <Check size={16} />
                      )}{' '}
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Which skill will you offer for this profile?
              </label>
              {userProfile?.skills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userProfile.skills.map((skill) => {
                    const isUsed = usedSkills.includes(skill);
                    const isCurrent = skill === editingProfile?.skill;
                    const isDisabled = isUsed && !isCurrent;
                    return (
                      <button
                        key={skill}
                        onClick={() => handleSkillChange(skill)}
                        disabled={isDisabled}
                        className={`px-4 py-2 text-sm font-medium rounded-full border-2 transition-all duration-200 flex items-center gap-2 ${
                          availabilityData.skill === skill
                            ? 'bg-slate-800 text-white border-slate-800'
                            : 'bg-white text-slate-700 border-slate-200'
                        } ${
                          isDisabled
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:border-slate-400'
                        }`}
                      >
                        {availabilityData.skill === skill && (
                          <Check size={16} />
                        )}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-slate-500 p-4 bg-slate-50 rounded-md">
                  You haven't added any skills to your main profile yet.
                </p>
              )}
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <label
                htmlFor="details"
                className="block text-sm font-semibold text-slate-700"
              >
                Do you have any specific tools or requirements to mention?
              </label>
              <textarea
                id="details"
                rows="4"
                value={availabilityData.workDetails}
                onChange={(e) =>
                  setAvailabilityData({
                    ...availabilityData,
                    workDetails: e.target.value,
                  })
                }
                placeholder="e.g., I have my own ladder and power tools..."
                className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
              ></textarea>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between items-center">
        <div>
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 rounded-md transition duration-200 text-sm font-semibold bg-slate-200 text-slate-800 hover:bg-slate-300"
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}
        </div>
        <div>
          {step < 4 && (
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !locationData.coordinates) ||
                (step === 3 && !availabilityData.skill)
              }
              className="flex items-center gap-2 px-4 py-2 rounded-md transition duration-200 text-sm font-semibold bg-slate-800 text-white hover:bg-slate-900 disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              Next <ArrowRight size={16} />
            </button>
          )}
          {step === 4 && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 rounded-md transition duration-200 text-sm font-semibold bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Check size={16} />
              )}
              {loading
                ? 'Saving...'
                : editingProfile
                ? 'Update Profile'
                : 'Save Profile'}
            </button>
          )}
        </div>
      </div>
      <div className="mt-4 text-sm min-h-[20px]">
        {error && (
          <p className="text-red-600 flex items-center gap-2">
            <AlertTriangle size={16} /> {error}
          </p>
        )}
      </div>
    </div>
  );
}
