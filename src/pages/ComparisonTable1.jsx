import React from "react";
import { CheckCircle, XCircle, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for individuals getting started",
    features: {
      storage: true,
      support: false,
      analytics: false,
      integrations: false,
      branding: false
    }
  },
  {
    name: "Professional",
    description: "For teams and growing businesses",
    features: {
      storage: true,
      support: true,
      analytics: true,
      integrations: true,
      branding: false
    }
  },
  {
    name: "Enterprise",
    description: "Full power for large organizations",
    features: {
      storage: true,
      support: true,
      analytics: true,
      integrations: true,
      branding: true
    }
  }
];

const featuresList = [
  { label: "Unlimited Storage", key: "storage" },
  { label: "24/7 Support", key: "support" },
  { label: "Advanced Analytics", key: "analytics" },
  { label: "API Integrations", key: "integrations" },
  { label: "Custom Branding", key: "branding" }
];

const ComparisonTablePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 text-white p-10">
      <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-12">
        📊 Compare Our Plans
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-white/5 rounded-xl p-6 backdrop-blur border border-white/10">
          <h2 className="text-2xl font-bold mb-4 text-purple-300">Features</h2>
          <ul className="space-y-4 text-white/90">
            {featuresList.map((feature, idx) => (
              <li key={idx} className="text-base flex items-center gap-2">
                • {feature.label}
              </li>
            ))}
          </ul>
        </div>

        {plans.map((plan, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 shadow-lg border border-white/10 hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-xl font-bold mb-2 text-teal-300">{plan.name}</h3>
            <p className="text-sm text-white/70 mb-6 min-h-[48px]">{plan.description}</p>
            <ul className="space-y-4">
              {featuresList.map((feature, j) => {
                const available = plan.features[feature.key];
                return (
                  <li key={j} className="flex items-center gap-3">
                    {available ? (
                      <CheckCircle className="text-green-400 w-5 h-5" />
                    ) : (
                      <XCircle className="text-red-400 w-5 h-5" />
                    )}
                    <span>{feature.label}</span>
                  </li>
                );
              })}
            </ul>
            <button className="mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-full font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all">
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>

      <footer className="text-center text-sm text-white/40 mt-16 border-t border-white/10 pt-6">
        © 2025 Tinitiate. All rights reserved.
      </footer>
    </div>
  );
};

export default ComparisonTablePage;
