"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth, mockOrders } from "@/context/AuthContext";

export default function InvoicePage() {
  const params = { id: "ORD-2026-001" }; // Mock - would be from URL
  const orderId = params.id;
  const order = mockOrders.find((o) => o.id === orderId);

  if (!order) {
    return <div className="p-8 text-center">Order not found</div>;
  }

  const handlePrint = () => window.print();

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8 no-print">
        <h1 className="text-2xl font-bold">Invoice {orderId}</h1>
        <button onClick={handlePrint} className="btn-milk">Print</button>
      </div>

      {/* Invoice Header */}
      <div className="flex justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold">MILK MAKEUP</h2>
          <p className="text-sm text-gray-500">Jakarta, Indonesia</p>
        </div>
        <div className="text-right">
          <p className="font-bold">INVOICE</p>
          <p className="text-sm">{orderId}</p>
          <p className="text-sm text-gray-500">{order.date}</p>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-8">
        <p className="text-sm text-gray-500">Bill To:</p>
        <p className="font-bold">Customer</p>
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Item</th>
            <th className="text-right py-2">Qty</th>
            <th className="text-right py-2">Price</th>
            <th className="text-right py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((product, idx) => (
            <tr key={idx} className="border-b">
              <td className="py-2">{product}</td>
              <td className="text-right">1</td>
              <td className="text-right">Rp {(order.total / order.products.length).toLocaleString()}</td>
              <td className="text-right">Rp {(order.total / order.products.length).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}
      <div className="flex justify-end">
        <div className="w-48">
          <div className="flex justify-between py-2 border-b">
            <span>Subtotal</span>
            <span>Rp {order.total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Shipping</span>
            <span>Rp 15,000</span>
          </div>
          <div className="flex justify-between py-2 font-bold text-lg">
            <span>Total</span>
            <span>Rp {(order.total + 15000).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>Thank you for your purchase!</p>
        <p>Questions? hello@milkmakeup.com</p>
      </div>
    </div>
  );
}