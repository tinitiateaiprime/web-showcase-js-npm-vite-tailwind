// const Contact = () => {
//     return (
//       <div className="p-4">
//         <h2 className="text-2xl font-bold">Contact Page</h2>
//         <p>Welcome to the Contact page!</p>
//       </div>
//     );
//   };
  
//   export default Contact;
  


import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-6">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 h-32"
            />
            <button className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition duration-300">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center items-start space-y-6">
          <h3 className="text-2xl font-semibold text-gray-700">Contact Information</h3>
          <p className="text-gray-600">We’d love to hear from you! Reach out to us via any of the methods below.</p>
          
          <div className="flex items-center space-x-3">
            <Phone className="text-blue-500" />
            <p className="text-gray-700 text-lg">+1 (123) 456-7890</p>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="text-red-500" />
            <p className="text-gray-700 text-lg">contact@company.com</p>
          </div>

          <div className="flex items-center space-x-3">
            <MapPin className="text-green-500" />
            <p className="text-gray-700 text-lg">123 Business St, New York, NY</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
