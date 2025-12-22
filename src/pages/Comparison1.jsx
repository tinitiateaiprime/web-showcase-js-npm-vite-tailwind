import React from "react";
import {
  Trophy,
  Star,
  ShieldCheck,
  TrendingUp,
  CheckCircle,
  XCircle,
} from "lucide-react";

const ComparisonPage = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "Access to limited tools",
        "Community support",
        "Standard UI templates",
        false,
        false,
      ],
    },
    {
      name: "Pro",
      price: "$12/mo",
      features: [
        "All Basic features",
        "Priority support",
        "Advanced UI templates",
        "Design assets access",
        false,
      ],
    },
    {
      name: "Elite",
      price: "$29/mo",
      features: [
        "All Pro features",
        "1-on-1 Mentorship",
        "Premium assets pack",
        "AI code assistant",
        "Enterprise dashboard",
      ],
    },
  ];

  const featureList = [
    "Basic Access",
    "Priority Support",
    "Advanced Templates",
    "Design Assets",
    "Enterprise Dashboard",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent mb-2">
          Compare Plans
        </h1>
        <p className="text-white/70 text-lg">
          Find the plan that fits your creative needs.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Features</h2>
          {featureList.map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-white/80 border-b border-white/10 py-2"
            >
              <Star className="w-5 h-5 text-yellow-400" />
              {feature}
            </div>
          ))}
        </div>

        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10 hover:scale-105 transition-transform duration-300 shadow-lg relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 p-2">
              {idx === 2 && (
                <Trophy className="w-6 h-6 text-yellow-400" title="Best Value" />
              )}
            </div>

            <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
            <p className="text-lg text-purple-300 mb-6">{plan.price}</p>

            <ul className="space-y-4">
              {plan.features.map((enabled, i) => (
                <li key={i} className="flex items-center gap-3">
                  {enabled ? (
                    <CheckCircle className="text-green-400 w-5 h-5" />
                  ) : (
                    <XCircle className="text-red-400 w-5 h-5" />
                  )}
                  <span className={enabled ? "" : "line-through text-white/50"}>
                    {featureList[i]}
                  </span>
                </li>
              ))}
            </ul>

            <button className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 w-full text-white font-semibold py-2 rounded-lg hover:scale-105 transition-all">
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonPage;
