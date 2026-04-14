"use client";
import { useState } from "react";
import { AlertTriangle, Bell, BellOff } from "lucide-react";
import { distributorProducts } from "@/context/AdminCartContext";

export default function StockAlertsPage() {
  const [alerts, setAlerts] = useState<number[]>([]);
  const [threshold, setThreshold] = useState(100);

  const lowStock = distributorProducts.filter((p) => p.stock <= threshold);

  const toggleAlert = (id: number) => {
    if (alerts.includes(id)) {
      setAlerts(alerts.filter((a) => a !== id));
    } else {
      setAlerts([...alerts, id]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Stock Alerts</h1>
        <div className="text-sm text-gray-500">
          {alerts.length} active alerts
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white border p-6 mb-6">
        <h2 className="font-bold mb-4">Alert Threshold</h2>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="10"
            max="500"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="flex-1"
          />
          <span className="font-bold w-20">{threshold} units</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Alert when stock falls below threshold
        </p>
      </div>

      {/* Low Stock Products */}
      <div className="bg-white border">
        <div className="p-4 border-b">
          <h2 className="font-bold flex items-center gap-2">
            <AlertTriangle size={18} className="text-yellow-600" />
            Low Stock Items ({lowStock.length})
          </h2>
        </div>
        <div className="divide-y">
          {lowStock.map((product) => (
            <div key={product.id} className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">
                  SKU: {product.sku} • Category: {product.category}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={`font-bold ${product.stock <= 50 ? "text-red-600" : "text-yellow-600"}`}>
                    {product.stock}
                  </p>
                  <p className="text-xs text-gray-500">in stock</p>
                </div>
                <button
                  onClick={() => toggleAlert(Number(product.id))}
                  className={`p-2 ${alerts.includes(Number(product.id)) ? "bg-yellow-100" : "bg-gray-100"}`}
                >
                  {alerts.includes(Number(product.id)) ? (
                    <Bell size={18} className="text-yellow-600" />
                  ) : (
                    <BellOff size={18} />
                  )}
                </button>
              </div>
            </div>
          ))}
          {lowStock.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No low stock items
            </div>
          )}
        </div>
      </div>

      {/* All Products Stock */}
      <div className="bg-white border mt-6">
        <div className="p-4 border-b">
          <h2 className="font-bold">All Products</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 text-xs text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">SKU</th>
              <th className="px-4 py-3 text-right">Stock</th>
              <th className="px-4 py-3 text-right">Alert</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {distributorProducts.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3 text-gray-500">{product.sku}</td>
                <td className="px-4 py-3 text-right font-bold">{product.stock}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => toggleAlert(Number(product.id))}
                    className="text-sm"
                  >
                    {alerts.includes(Number(product.id)) ? "🔔 On" : "🔕 Off"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}