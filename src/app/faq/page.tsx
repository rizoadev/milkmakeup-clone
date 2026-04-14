export default function FAQPage() {
  const faqs = [
    { q: "Are your products vegan?", a: "Yes! All Milk Makeup products are 100% vegan and cruelty-free." },
    { q: "Where do you ship?", a: "We ship worldwide. Free shipping on orders over $50." },
    { q: "What is your return policy?", a: "We offer a 30-day return policy for unopened items." },
    { q: "Are your products safe for sensitive skin?", a: "Yes, our products are formulated for all skin types." },
    { q: "How long do products last?", a: "Most products last 12 months after opening." },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">FAQ</h1>
      <p className="text-gray-600 mb-12">Frequently Asked Questions</p>
      
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b pb-6">
            <h3 className="font-bold mb-2">{faq.q}</h3>
            <p className="text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}