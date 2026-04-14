export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-sm">
        <section>
          <h2 className="font-bold mb-2">1. Information We Collect</h2>
          <p className="text-gray-600">We collect information you provide directly to us, such as name, email, and shipping address when placing an order.</p>
        </section>
        
        <section>
          <h2 className="font-bold mb-2">2. How We Use Information</h2>
          <p className="text-gray-600">We use the information to process orders, communicate with you, and improve our services.</p>
        </section>
        
        <section>
          <h2 className="font-bold mb-2">3. Information Sharing</h2>
          <p className="text-gray-600">We do not sell or share your personal information with third parties except as necessary to fulfill your orders.</p>
        </section>
        
        <section>
          <h2 className="font-bold mb-2">4. Data Security</h2>
          <p className="text-gray-600">We implement appropriate security measures to protect your personal information.</p>
        </section>
        
        <section>
          <h2 className="font-bold mb-2">5. Contact</h2>
          <p className="text-gray-600">Questions? Contact us at hello@milkmakeup.com</p>
        </section>
      </div>
    </div>
  );
}