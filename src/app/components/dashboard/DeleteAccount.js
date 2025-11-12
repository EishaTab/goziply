"use client";
import { AlertTriangle } from "lucide-react";

export default function DeleteAccount({ session }) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deleted successfully (dummy action).");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <h2 className="text-2xl font-bold text-red-600">Delete Account</h2>

      {/* Warning Card */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-red-400">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-red-600" size={24} />
          <h3 className="text-xl font-semibold text-gray-700">Danger Zone</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Deleting your account will remove all your data permanently. This action cannot be undone.
        </p>
        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
}
