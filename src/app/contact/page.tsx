"use client";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Message Sent!</h1>
        <p className="text-gray-600">We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-12">We'd love to hear from you.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required type="text" placeholder="Name" className="input-milk" />
        <input required type="email" placeholder="Email" className="input-milk" />
        <input required type="text" placeholder="Subject" className="input-milk" />
        <textarea required placeholder="Message" rows={5} className="input-milk resize-none"></textarea>
        <button type="submit" className="btn-milk w-full">Send Message</button>
      </form>
      
      <div className="mt-12 text-sm text-gray-600">
        <p className="font-bold">Email</p>
        <p>hello@milkmakeup.com</p>
        <p className="mt-4 font-bold">Social</p>
        <p>@milkmakeup</p>
      </div>
    </div>
  );
}