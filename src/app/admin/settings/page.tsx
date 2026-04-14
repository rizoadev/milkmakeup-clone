"use client";
import { useState } from "react";
import { Users, Mail, Phone, MapPin, Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [distributor, setDistributor] = useState({
    name: "PT Distributor Utama",
    email: "admin@distributor.com",
    phone: "+62 812 3456 7890",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    territory: "Jabodetabek",
    discount: "25%",
  });

  const handleSave = () => {
    alert("Settings saved!");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distributor Info */}
        <div className="bg-white border p-6">
          <div className="flex items-center gap-2 mb-6">
            <Users size={20} />
            <h2 className="font-bold">Distributor Information</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Company Name</label>
              <input
                type="text"
                value={distributor.name}
                onChange={(e) => setDistributor({ ...distributor, name: e.target.value })}
                className="w-full px-3 py-2 border"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Email</label>
              <input
                type="email"
                value={distributor.email}
                onChange={(e) => setDistributor({ ...distributor, email: e.target.value })}
                className="w-full px-3 py-2 border"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Phone</label>
              <input
                type="tel"
                value={distributor.phone}
                onChange={(e) => setDistributor({ ...distributor, phone: e.target.value })}
                className="w-full px-3 py-2 border"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Address</label>
              <input
                type="text"
                value={distributor.address}
                onChange={(e) => setDistributor({ ...distributor, address: e.target.value })}
                className="w-full px-3 py-2 border"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Territory</label>
              <select
                value={distributor.territory}
                onChange={(e) => setDistributor({ ...distributor, territory: e.target.value })}
                className="w-full px-3 py-2 border"
              >
                <option value="Jabodetabek">Jabodetabek</option>
                <option value="Java">Java</option>
                <option value="Sumatra">Sumatra</option>
                <option value="Kalimantan">Kalimantan</option>
                <option value="Sulawesi">Sulawesi</option>
                <option value="Indonesia">All Indonesia</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Wholesale Discount</label>
              <input
                type="text"
                value={distributor.discount}
                onChange={(e) => setDistributor({ ...distributor, discount: e.target.value })}
                className="w-full px-3 py-2 border"
              />
            </div>
          </div>
        </div>

        {/* Other Settings */}
        <div className="bg-white border p-6">
          <h2 className="font-bold mb-6">Order Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Minimum Order (Rp)</label>
              <input
                type="number"
                defaultValue={500000}
                className="w-full px-3 py-2 border"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Payment Terms</label>
              <select className="w-full px-3 py-2 border">
                <option>Net 7</option>
                <option>Net 14</option>
                <option>Net 30</option>
                <option> COD</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Shipping Method</label>
              <select className="w-full px-3 py-2 border">
                <option>JNE Express</option>
                <option>J&T Express</option>
                <option>SiCepat</option>
                <option>GrabExpress</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Notification Email</label>
              <input
                type="email"
                defaultValue="notifications@distributor.com"
                className="w-full px-3 py-2 border"
              />
            </div>
          </div>
          
          <button onClick={handleSave} className="btn-milk w-full mt-6">
            <Save size={16} className="inline mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}