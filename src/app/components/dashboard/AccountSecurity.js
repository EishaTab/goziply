"use client";
import { useState, useEffect } from "react";
import { Key } from "lucide-react";

export default function AccountSecurity({ session }) {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState({ text: "", type: "" });
  const [twoFA, setTwoFA] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch current user details on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/dashboard/profile");
        const data = await res.json();

        if (data.user) {
          setTwoFA(data.user.twoFA);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUserData();
  }, []);

  // ✅ Handle password input
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
    if (passwordMessage.text) {
      setPasswordMessage({ text: "", type: "" });
    }
  };

  // ✅ Handle password change (calls backend)
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!passwords.currentPassword || !passwords.newPassword) {
      setPasswordMessage({
        text: "Please fill out all password fields.",
        type: "error",
      });
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordMessage({ text: "New passwords do not match.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/dashboard/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setPasswordMessage({ text: data.message, type: "success" });
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setPasswordMessage({ text: data.error || "Update failed.", type: "error" });
      }
    } catch (err) {
      setPasswordMessage({ text: "An error occurred.", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setPasswordMessage({ text: "", type: "" }), 3000);
    }
  };

  // ✅ Handle 2FA toggle (calls backend)
  const handleToggle2FA = async () => {
    const newTwoFA = !twoFA;
    setTwoFA(newTwoFA);

    try {
      const res = await fetch("/api/dashboard/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ twoFA: newTwoFA }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to update 2FA status.");
        setTwoFA(!newTwoFA); // revert if failed
      }
    } catch (err) {
      console.error("2FA update failed:", err);
      setTwoFA(!newTwoFA); // revert if failed
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200">
      {/* Password Change Section */}
      <div>
        <h3 className="text-lg font-semibold text-slate-700 mb-1">Change Password</h3>
        <p className="text-sm text-slate-500 mb-6">
          Update your password for enhanced security.
        </p>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordInputChange}
              className="mt-1 block w-full md:max-w-sm px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordInputChange}
              className="mt-1 block w-full md:max-w-sm px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordInputChange}
              className="mt-1 block w-full md:max-w-sm px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition duration-200 text-sm font-semibold ${
                loading
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-slate-800 hover:bg-slate-900 text-white"
              }`}
            >
              <Key size={16} /> {loading ? "Updating..." : "Update Password"}
            </button>
            {passwordMessage.text && (
              <p
                className={`text-sm ${
                  passwordMessage.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {passwordMessage.text}
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Divider */}
      <hr className="my-8 border-slate-200" />

      {/* Two-Factor Authentication Section */}
      <div>
        <h3 className="text-lg font-semibold text-slate-700 mb-1">
          Two-Factor Authentication (2FA)
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Add an extra layer of security to your account during login.
        </p>
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div>
            <p className="font-medium text-slate-800">Enable 2FA</p>
            <p
              className={`text-sm ${
                twoFA ? "text-green-600" : "text-slate-500"
              }`}
            >
              {twoFA ? "Currently Enabled" : "Currently Disabled"}
            </p>
          </div>
          <button
            onClick={handleToggle2FA}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 ${
              twoFA ? "bg-slate-800" : "bg-slate-200"
            }`}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
                twoFA ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
