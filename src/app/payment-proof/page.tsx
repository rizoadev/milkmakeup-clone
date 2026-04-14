"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function PaymentProofPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(f);
    }
  };

  const handleSubmit = () => {
    if (!orderId || !file) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setDone(true);
    }, 1500);
  };

  if (!isAuthenticated) return null;

  if (done) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Proof Submitted!</h1>
        <p className="text-gray-600 mb-8">We'll verify your payment within 24 hours.</p>
        <Link href="/account/orders" className="btn-milk">View Orders</Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-2">Confirm Payment</h1>
      <p className="text-gray-600 mb-8">Upload your payment receipt.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Order ID</label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="ORD-2026-001"
            className="input-milk"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Upload Receipt</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFile}
            className="input-milk p-2"
          />
        </div>

        {preview && (
          <div className="mt-4">
            <img src={preview} alt="Receipt preview" className="max-h-48 object-contain border" />
          </div>
        )}

        <div className="bg-gray-50 p-4 text-sm">
          <p className="font-bold mb-2">Bank Transfer Details:</p>
          <p>BCA: 1234567890</p>
          <p>a/n PT Milk Makeup Indonesia</p>
          <p className="mt-2 text-gray-500">Amount will be confirmed by our team.</p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!orderId || !file || uploading}
          className="btn-milk w-full"
        >
          {uploading ? "Uploading..." : "Submit Proof"}
        </button>
      </div>
    </div>
  );
}