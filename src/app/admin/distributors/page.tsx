"use client";
import { useState } from "react";
import { Users, Search, Mail, Phone, MapPin, Plus } from "lucide-react";

const distributors = [
  { id: "DIST-001", name: "PT Beautyshop Indonesia", email: "order@beautyshop.co.id", phone: "+62 811 1111", area: "Jakarta", status: "active", orders: 45 },
  { id: "DIST-002", name: "CV Glow Utama", email: "admin@glowutama.com", phone: "+62 822 2222", area: "Bandung", status: "active", orders: 38 },
  { id: "DIST-003", name: "Toko Makeup Surabaya", email: "info@makeupsby.id", phone: "+62 833 3333", area: "Surabaya", status: "active", orders: 29 },
  { id: "DIST-004", name: "Beauty Jaya Semarang", email: "order@beautyjaya.id", phone: "+62 844 4444", area: "Semarang", status: "active", orders: 22 },
  { id: "DIST-005", name: "Glow Meda", email: "medan@glow.id", phone: "+62 855 5555", area: "Medan", status: "inactive", orders: 15 },
];

export default function AdminDistributorsPage() {
  const [search, setSearch] = useState("");

  const filteredDistributors = distributors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Distributors</h1>
        <button className="btn-milk">
          <Plus size={16} className="inline mr-2" />
          Add Distributor
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search distributors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border"
        />
      </div>

      {/* Distributors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDistributors.map((distributor) => (
          <div key={distributor.id} className="bg-white border p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold">{distributor.name}</h3>
                <p className="text-xs text-gray-500">{distributor.id}</p>
              </div>
              <span className={`px-2 py-1 text-xs ${distributor.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                {distributor.status}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={14} />
                {distributor.area}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={14} />
                {distributor.email}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={14} />
                {distributor.phone}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="text-sm text-gray-500">{distributor.orders} orders</span>
              <button className="text-sm underline">View Orders</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}