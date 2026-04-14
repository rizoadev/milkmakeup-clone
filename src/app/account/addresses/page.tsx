"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function AddressesPage() {
  const { user, isAuthenticated, addAddress, updateAddress, deleteAddress } = useAuth();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", province: "", postal: "", isDefault: false });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateAddress(editingId, form);
    } else {
      addAddress(form);
    }
    setShowForm(false);
    setEditingId(null);
    setForm({ name: "", phone: "", address: "", city: "", province: "", postal: "", isDefault: false });
  };

  const handleEdit = (addr: typeof form & { id: string }) => {
    setForm({ name: addr.name, phone: addr.phone, address: addr.address, city: addr.city, province: addr.province, postal: addr.postal, isDefault: addr.isDefault });
    setEditingId(addr.id);
    setShowForm(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Addresses</h1>
        <Link href="/account" className="text-sm underline">&larr; Back</Link>
      </div>

      {/* Address List */}
      {user.addresses.length === 0 && !showForm ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No addresses saved</p>
          <button onClick={() => setShowForm(true)} className="btn-milk">
            Add Address
          </button>
        </div>
      ) : (
        <div className="grid gap-4 mb-6">
          {user.addresses.map((addr) => (
            <div key={addr.id} className="bg-white border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold">{addr.name}</p>
                  <p className="text-sm">{addr.phone}</p>
                  <p className="text-sm">{addr.address}</p>
                  <p className="text-sm">{addr.city}, {addr.province} {addr.postal}</p>
                  {addr.isDefault && (
                    <span className="text-xs bg-black text-white px-2 py-0.5 mt-2 inline-block">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(addr)} className="text-sm underline">Edit</button>
                  <button onClick={() => deleteAddress(addr.id)} className="text-sm text-red-600">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white border p-6">
          <h2 className="font-bold mb-4">{editingId ? "Edit Address" : "Add Address"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                <label className="block text-xs text-gray-500 mb-1">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-milk"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Address</label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="input-milk"
                rows={2}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="input-milk"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Province</label>
                <input
                  type="text"
                  value={form.province}
                  onChange={(e) => setForm({ ...form, province: e.target.value })}
                  className="input-milk"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Postal Code</label>
                <input
                  type="text"
                  value={form.postal}
                  onChange={(e) => setForm({ ...form, postal: e.target.value })}
                  className="input-milk"
                  required
                />
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
              />
              <span className="text-sm">Set as default</span>
            </label>
            <div className="flex gap-4">
              <button type="submit" className="btn-milk flex-1">
                {editingId ? "Update" : "Save"} Address
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingId(null); }}
                className="btn-outline flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {!showForm && user.addresses.length > 0 && (
        <button onClick={() => setShowForm(true)} className="btn-milk">
          + Add New Address
        </button>
      )}
    </div>
  );
}