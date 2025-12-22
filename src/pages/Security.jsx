import React, { useState } from "react";

const SecurityPage = () => {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [sessions, setSessions] = useState([
    { device: "Windows Chrome", location: "India", ip: "192.168.0.2", current: true },
    { device: "iPhone Safari", location: "USA", ip: "45.76.12.5", current: false },
  ]);

  const loginHistory = [
    { date: "2025-08-01", ip: "192.168.0.2", location: "India", status: "Success" },
    { date: "2025-07-30", ip: "45.76.12.5", location: "USA", status: "Failed" },
    { date: "2025-07-29", ip: "192.168.0.3", location: "India", status: "Success" },
  ];

  const passwordStrength = () => {
    if (password.length > 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
      return "Strong";
    } else if (password.length > 5) {
      return "Medium";
    } else {
      return "Weak";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-indigo-700">🔒 Security Settings</h2>

      {/* Two-Factor Authentication */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-semibold mb-2">Two-Factor Authentication (2FA)</h3>
        <p className="text-gray-600 mb-3">
          Add an extra layer of security by enabling 2FA.
        </p>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={twoFAEnabled}
            onChange={() => setTwoFAEnabled(!twoFAEnabled)}
            className="w-5 h-5"
          />
          {twoFAEnabled ? "Enabled" : "Disabled"}
        </label>
      </div>

      {/* Password Strength */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-semibold mb-2">Change Password</h3>
        <input
          type="password"
          placeholder="Enter new password"
          className="border p-2 rounded w-full mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-sm">
          Password Strength:{" "}
          <span
            className={
              passwordStrength() === "Strong"
                ? "text-green-600"
                : passwordStrength() === "Medium"
                ? "text-yellow-600"
                : "text-red-600"
            }
          >
            {passwordStrength()}
          </span>
        </p>
      </div>

      {/* Login History */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-semibold mb-2">Recent Login Activity</h3>
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">IP</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {loginHistory.map((log, i) => (
              <tr key={i} className="border">
                <td className="p-2">{log.date}</td>
                <td className="p-2">{log.ip}</td>
                <td className="p-2">{log.location}</td>
                <td
                  className={
                    log.status === "Success"
                      ? "text-green-600 p-2"
                      : "text-red-600 p-2"
                  }
                >
                  {log.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Active Sessions */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-semibold mb-2">Active Sessions</h3>
        {sessions.map((s, i) => (
          <div
            key={i}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <p className="font-medium">{s.device}</p>
              <p className="text-sm text-gray-600">
                {s.location} — {s.ip}
              </p>
            </div>
            {!s.current && (
              <button
                onClick={() =>
                  setSessions(sessions.filter((_, index) => index !== i))
                }
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            )}
            {s.current && (
              <span className="text-green-600 text-sm">Current Session</span>
            )}
          </div>
        ))}
      </div>

      {/* Role & Permissions */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-semibold mb-2">Role & Permissions</h3>
        <select className="border p-2 rounded w-full">
          <option>Admin</option>
          <option>Editor</option>
          <option>Viewer</option>
        </select>
      </div>

      {/* Security Alerts */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-semibold mb-2">Security Alerts</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li>Suspicious login attempt from USA.</li>
          <li>Password has not been updated in 90 days.</li>
          <li>2FA is disabled — enable for better security.</li>
        </ul>
      </div>

      {/* Security Tips */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-semibold mb-2">Security Tips</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li>Use a unique password for this account.</li>
          <li>Enable two-factor authentication.</li>
          <li>Review login history regularly.</li>
          <li>Log out of devices you no longer use.</li>
        </ul>
      </div>
    </div>
  );
};

export default SecurityPage;
