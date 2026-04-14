"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Demo login - accept any email with password "demo"
    if (password === "demo" || password.length >= 4) {
      const success = login(email, password);
      if (success || true) {
        router.push("/account");
      }
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Login</h1>
      <p className="text-gray-600 mb-8">Welcome back.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-milk"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-milk"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button type="submit" disabled={loading} className="btn-milk w-full">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline">Register</Link>
      </p>

      <div className="mt-8 p-4 bg-gray-50 text-sm">
        <p className="font-bold mb-2">Demo Login</p>
        <p>Email: any email</p>
        <p>Password: demo (or any 4+ chars)</p>
      </div>
    </div>
  );
}