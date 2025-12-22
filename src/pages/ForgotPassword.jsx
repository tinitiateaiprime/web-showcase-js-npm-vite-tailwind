import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <form>
          <div className="mb-4">
            <label className="block font-semibold">Email:</label>
            <input type="email" className="w-full p-2 border rounded" placeholder="Enter your email" required />
          </div>
          <button className="w-full bg-orange-500 text-white p-2 rounded">Reset Password</button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
