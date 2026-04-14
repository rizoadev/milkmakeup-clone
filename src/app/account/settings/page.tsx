"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, phone: user.phone });
    }
  }, [user]);

  if (!isAuthenticated || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    setMessage("Profile updated!");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Link href="/account" className="text-sm underline">&larr; Back</Link>
      </div>

      {/* Profile */}
      <div className="bg-white border p-6 mb-6">
        <h2 className="font-bold mb-4">Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-milk"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              className="input-milk bg-gray-50"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="input-milk"
            />
          </div>
          {message && <p className="text-green-600 text-sm">{message}</p>}
          <button type="submit" className="btn-milk w-full">Save Changes</button>
        </form>
      </div>

      {/* Quick Links */}
      <div className="space-y-2">
        <Link href="/account/password" className="block bg-white border p-4">
          Change Password →
        </Link>
        <Link href="/account/wishlist" className="block bg-white border p-4">
          My Wishlist →
        </Link>
        <Link href="/account/addresses" className="block bg-white border p-4">
          Address Book →
        </Link>
      </div>
    </div>
  );
}