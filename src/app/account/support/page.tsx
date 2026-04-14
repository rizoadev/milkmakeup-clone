"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

type Ticket = {
  id: string;
  subject: string;
  status: "open" | "pending" | "resolved";
  createdAt: string;
  lastMessage: string;
};

export default function SupportPage() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject || !form.message) return;
    
    const newTicket: Ticket = {
      id: "TKT-" + Date.now(),
      subject: form.subject,
      status: "open",
      createdAt: new Date().toISOString().split("T")[0],
      lastMessage: form.message,
    };
    
    setTickets([...tickets, newTicket]);
    setForm({ subject: "", message: "" });
    setShowNew(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Support</h1>
        <Link href="/account" className="text-sm underline">&larr; Back</Link>
      </div>

      {/* FAQ Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {["Order Status", "Shipping", "Returns", "Payment", "Account", "Products"].map((topic) => (
          <Link key={topic} href="/faq" className="bg-white border p-4 text-center hover:bg-gray-50">
            <p className="font-medium">{topic}</p>
          </Link>
        ))}
      </div>

      {/* Tickets */}
      <div className="bg-white border">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-bold">My Tickets</h2>
          <button onClick={() => setShowNew(true)} className="btn-milk text-sm">
            New Ticket
          </button>
        </div>
        <div className="divide-y">
          {tickets.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No tickets yet. Need help? Create a new ticket.
            </div>
          ) : (
            tickets.map((ticket) => (
              <div key={ticket.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{ticket.subject}</p>
                  <span className={`text-xs px-2 py-1 ${
                    ticket.status === "open" ? "bg-green-100 text-green-800" :
                    ticket.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100"
                  }`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{ticket.id} • {ticket.createdAt}</p>
                <p className="text-sm mt-2 line-clamp-2">{ticket.lastMessage}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-8 bg-gray-50 p-6">
        <h3 className="font-bold mb-2">Other Ways to Reach Us</h3>
        <p className="text-sm">Email: support@milkmakeup.com</p>
        <p className="text-sm">WhatsApp: +62 812 3456 7890</p>
        <p className="text-sm">Hours: Mon-Fri, 9AM-6PM WIB</p>
      </div>

      {/* New Ticket Modal */}
      {showNew && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 max-w-lg w-full">
            <h3 className="font-bold mb-4">New Support Ticket</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="input-milk"
                  required
                >
                  <option value="">Select topic...</option>
                  <option value="Order Issue">Order Issue</option>
                  <option value="Payment Issue">Payment Issue</option>
                  <option value="Shipping Issue">Shipping Issue</option>
                  <option value="Product Question">Product Question</option>
                  <option value="Return/Refund">Return/Refund</option>
                  <option value="Account Issue">Account Issue</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input-milk"
                  rows={4}
                  required
                />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn-milk flex-1">Submit</button>
                <button type="button" onClick={() => setShowNew(false)} className="btn-outline flex-1">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}