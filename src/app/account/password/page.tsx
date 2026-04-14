"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function PasswordPage() {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const { changePassword } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPass !== confirm) {
      setMessage("Passwords do not match");
      return;
    }
    
    if (newPass.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    const success = changePassword(current, newPass);
    if (success) {
      setMessage("Password changed successfully!");
      setCurrent("");
      setNewPass("");
      setConfirm("");
    } else {
      setMessage("Failed to change password");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Change Password</h1>
      <p className="text-gray-600 mb-8">Update your password.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Current Password</label>
          <input
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="input-milk"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">New Password</label>
          <input
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="input-milk"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Confirm New Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="input-milk"
            required
          />
        </div>

        {message && (
          <p className={message.includes("success") ? "text-green-600 text-sm" : "text-red-600 text-sm"}>
            {message}
          </p>
        )}

        <div className="flex gap-4">
          <button type="submit" className="btn-milk flex-1">
            Change Password
          </button>
          <Link href="/account" className="btn-outline flex-1 text-center">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}