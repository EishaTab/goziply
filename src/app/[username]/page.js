"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "@/app/components/Loader"; // adjust if needed

export default function PublicProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return; // prevent fetch until we have a username

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/dashboard/upublic/${username}`);
        const data = await res.json();

        if (res.ok && data.user) setUser(data.user);
        else setUser(null);
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) return <Loader />;

  if (!user)
    return (
      <p className="text-center text-red-500 mt-10">
        User not found
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      {/* --- Header --- */}
      <div className="flex items-center gap-6">
        <img
          src={user.profileImage || "/default-avatar.png"}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-24 h-24 rounded-full object-cover border border-slate-200"
        />
        <div>
          <h1 className="text-2xl font-semibold">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-sm text-slate-500">@{user.username}</p>
          {user.bio && <p className="mt-2 text-slate-700">{user.bio}</p>}
        </div>
      </div>

      {/* --- Service Info --- */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ProfileInfo label="Category" value={user.category} />
        <ProfileInfo label="City" value={user.city} />
        <ProfileInfo
          label="Hourly Rate"
          value={user.hourlyRate ? `$${user.hourlyRate}/hr` : "Not specified"}
        />
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase">
            Availability
          </h3>
          <p
            className={`mt-1 font-medium ${
              user.availability ? "text-green-600" : "text-red-600"
            }`}
          >
            {user.availability ? "Available" : "Not Available"}
          </p>
        </div>
      </div>

      {/* --- Skills --- */}
      {user.skills && user.skills.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-500 uppercase">
            Skills
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {user.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileInfo({ label, value }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-500 uppercase">{label}</h3>
      <p className="mt-1 text-slate-700">{value || "Not specified"}</p>
    </div>
  );
}
