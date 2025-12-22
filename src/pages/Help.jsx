import React, { useState } from "react";

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState("");
  const [language, setLanguage] = useState("en");

  const faqs = [
    { question: "How to reset my password?", answer: "Go to Security Settings and click 'Reset Password'." },
    { question: "How to contact support?", answer: "Use the Contact form below or email us at support@example.com." },
    { question: "How to change language?", answer: "Select your preferred language from the dropdown above." }
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert(`Feedback submitted: ${feedback}`);
    setFeedback("");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">❓ Help & Support</h2>

      {/* Language Selector */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded p-1"
        >
          <option value="en">English</option>
          <option value="te">Telugu</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      {/* Search FAQ */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search help topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>

      {/* FAQ Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-3">Frequently Asked Questions</h3>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => (
            <div key={idx} className="mb-3">
              <p className="font-semibold">Q: {faq.question}</p>
              <p className="text-gray-600">A: {faq.answer}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>

      {/* Contact Support */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-3">Contact Support</h3>
        <p className="mb-2">Email: support@example.com</p>
        <p>Phone: +91 9876543210</p>
      </div>

      {/* Feedback Form */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-3">Send Feedback</h3>
        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback..."
            className="border rounded w-full p-2 mb-2"
            rows="4"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpPage;
