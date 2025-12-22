import React from "react";

const About = () => {
  const team = [
    { name: "John Doe", role: "CEO", img: "https://via.placeholder.com/150" },
    { name: "Jane Smith", role: "CTO", img: "https://via.placeholder.com/150" },
    { name: "Alex Johnson", role: "Lead Designer", img: "https://via.placeholder.com/150" },
  ];

  const values = [
    "Innovation",
    "Transparency",
    "Customer Focus",
    "Sustainability",
  ];

  const achievements = [
    "🏆 Best Startup 2023",
    "🌍 500+ Happy Clients",
    "🚀 Launched 10+ Successful Products",
  ];

  const funFacts = [
    { label: "Years in Business", value: "5+" },
    { label: "Projects Completed", value: "120+" },
    { label: "Countries Served", value: "15" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Intro */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-700">About Us</h1>
        <p className="text-lg text-gray-600 mt-3">
          Empowering businesses through innovation, creativity, and dedication.
        </p>
      </section>

      {/* Company Story */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed">
          Founded in 2018, we started with a small team passionate about
          creating impactful solutions. Over the years, we’ve grown into a
          global company delivering cutting-edge technology and exceptional
          customer experiences.
        </p>
      </section>

      {/* Team */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow text-center"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-3"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Vision & Mission</h2>
        <p className="text-gray-700">
          Our vision is to be the leading provider of innovative solutions
          worldwide. Our mission is to empower businesses and individuals to
          achieve their full potential through technology.
        </p>
      </section>

      {/* Core Values */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Core Values</h2>
        <ul className="list-disc list-inside text-gray-700">
          {values.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </section>

      {/* Achievements */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Achievements</h2>
        <ul className="space-y-2 text-gray-700">
          {achievements.map((achieve, index) => (
            <li key={index}>{achieve}</li>
          ))}
        </ul>
      </section>

      {/* Fun Facts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Fun Facts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {funFacts.map((fact, index) => (
            <div
              key={index}
              className="bg-indigo-100 p-6 rounded-lg shadow"
            >
              <h3 className="text-3xl font-bold text-indigo-700">{fact.value}</h3>
              <p className="text-gray-600">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mb-12 text-center">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Contact Us</h2>
        <p className="text-gray-700">
          📧 Email: contact@company.com | 📞 Phone: +1 234 567 890
        </p>
        <p className="text-gray-700 mt-2">
          📍 Location: 123 Business Street, Tech City
        </p>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-12">
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Join Our Journey 🚀
        </button>
      </section>
    </div>
  );
};

export default About;
