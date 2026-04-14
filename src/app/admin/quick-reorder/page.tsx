"use client";
import { useState } from "react";
import Link from "next/link";
import { Package, RotateCcw, Plus, Minus, Trash2, Save, Copy } from "lucide-react";
import { useAdminCart, distributorOrders } from "@/context/AdminCartContext";

export default function QuickReorderPage() {
  const { addToCart, items } = useAdminCart();
  const [savedTemplates, setSavedTemplates] = useState<{
    name: string;
    items: { id: string; name: string; qty: number }[];
  }[]>([
    {
      name: "Basic Package",
      items: [
        { id: "1", name: "Cloud Wing Mascara", qty: 10 },
        { id: "2", name: "Girl Gang Lip Gloss", qty: 10 },
        { id: "3", name: "Proof Primer", qty: 5 },
      ],
    },
  ]);
  const [showSave, setShowSave] = useState(false);
  const [templateName, setTemplateName] = useState("");

  const handleQuickAdd = (template: typeof savedTemplates[0]) => {
    template.items.forEach((item) => {
      const product = { id: item.id, name: item.name, slug: "", price: 0, wholesalePrice: 16000, stock: 100, image: "", category: "", description: "", sku: "", minOrder: 10 };
      for (let i = 0; i < item.qty; i++) addToCart(product);
    });
  };

  const handleSaveTemplate = () => {
    if (!templateName || items.length === 0) return;
    const newTemplate = {
      name: templateName,
      items: items.map((item) => ({ id: item.id, name: item.name, qty: item.quantity })),
    };
    setSavedTemplates([...savedTemplates, newTemplate]);
    setShowSave(false);
    setTemplateName("");
  };

  const handleDeleteTemplate = (idx: number) => {
    setSavedTemplates(savedTemplates.filter((_, i) => i !== idx));
  };

  const recentOrders = distributorOrders.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Quick Reorder</h1>
        <Link href="/admin" className="text-sm underline">&larr; Back</Link>
      </div>

      {/* Saved Templates */}
      <div className="bg-white border mb-6">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-bold">Saved Templates</h2>
          <button onClick={() => setShowSave(true)} className="btn-outline text-sm py-1">
            <Save size={14} className="inline mr-1" /> Save Current
          </button>
        </div>
        <div className="divide-y">
          {savedTemplates.map((template, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{template.name}</p>
                <p className="text-sm text-gray-500">
                  {template.items.reduce((s, i) => s + i.qty, 0)} items
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleQuickAdd(template)}
                  className="btn-milk text-sm py-1"
                >
                  <RotateCcw size={14} className="inline mr-1" /> Add to Cart
                </button>
                <button
                  onClick={() => handleDeleteTemplate(idx)}
                  className="text-red-600 text-sm"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {savedTemplates.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No templates saved
            </div>
          )}
        </div>
      </div>

      {/* Order History for Reorder */}
      <div className="bg-white border mb-6">
        <div className="p-4 border-b">
          <h2 className="font-bold">Order History</h2>
        </div>
        <div className="divide-y">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-gray-500">{order.date} • {order.items} items • Rp {order.total.toLocaleString()}</p>
              </div>
              <button className="btn-outline text-sm py-1">
                <Copy size={14} className="inline mr-1" /> Reorder
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Preview */}
      {items.length > 0 && (
        <div className="bg-white border p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">Current Cart</h2>
            <span className="text-sm text-gray-500">{items.reduce((s, i) => s + i.quantity, 0)} items</span>
          </div>
          <Link href="/admin/cart" className="btn-milk w-full">
            View Cart
          </Link>
        </div>
      )}

      {/* Save Template Modal */}
      {showSave && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 max-w-md w-full">
            <h3 className="font-bold mb-4">Save as Template</h3>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Template name"
              className="input-milk mb-4"
            />
            <p className="text-sm text-gray-500 mb-4">
              {items.length} items will be saved
            </p>
            <div className="flex gap-4">
              <button onClick={handleSaveTemplate} className="btn-milk flex-1">
                Save
              </button>
              <button onClick={() => setShowSave(false)} className="btn-outline flex-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}