"use client";
import { useState } from "react";
import { FileText, Download, BarChart3 } from "lucide-react";

export default function AdminReportsPage() {
  const [period, setPeriod] = useState("30");

  const reports = [
    { id: 1, name: "Sales Report", description: "Monthly sales breakdown by product", period: "March 2026" },
    { id: 2, name: "Inventory Report", description: "Current stock levels", period: "April 2026" },
    { id: 3, name: "Distributor Report", description: "Orders by distributor", period: "Q1 2026" },
    { id: 4, name: "Revenue Report", description: "Revenue by category", period: "March 2026" },
    { id: 5, name: "Top Products", description: "Best selling products", period: "March 2026" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <select value={period} onChange={(e) => setPeriod(e.target.value)} className="px-4 py-2 border">
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border p-5">
          <p className="text-xs text-gray-500 uppercase">Total Revenue</p>
          <p className="text-2xl font-bold mt-1">Rp 125.5M</p>
          <p className="text-xs text-green-600 mt-1">+15% from last period</p>
        </div>
        <div className="bg-white border p-5">
          <p className="text-xs text-gray-500 uppercase">Total Orders</p>
          <p className="text-2xl font-bold mt-1">1,245</p>
          <p className="text-xs text-green-600 mt-1">+8% from last period</p>
        </div>
        <div className="bg-white border p-5">
          <p className="text-xs text-gray-500 uppercase">Avg Order Value</p>
          <p className="text-2xl font-bold mt-1">Rp 100.8K</p>
          <p className="text-xs text-green-600 mt-1">+5% from last period</p>
        </div>
        <div className="bg-white border p-5">
          <p className="text-xs text-gray-500 uppercase">Active Distributors</p>
          <p className="text-2xl font-bold mt-1">12</p>
          <p className="text-xs text-green-600 mt-1">+2 new</p>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white border">
        <div className="p-4 border-b">
          <h2 className="font-bold">Available Reports</h2>
        </div>
        <div className="divide-y">
          {reports.map((report) => (
            <div key={report.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-medium">{report.name}</h3>
                  <p className="text-sm text-gray-500">{report.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{report.period}</span>
                <button className="btn-outline text-sm py-1 px-3">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}