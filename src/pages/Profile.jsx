import {
  Edit,
  Mail,
  Phone,
  User,
  Camera,
  BookOpen,
  CheckCircle,
} from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="backdrop-blur-lg bg-white/30 shadow-2xl rounded-3xl overflow-hidden w-full max-w-md border border-white/20">
        
        {/* Profile Banner */}
        <div className="relative bg-gradient-to-r from-pink-600 to-indigo-600 h-32 flex justify-center items-center">
          <div className="absolute -bottom-12">
            <div className="relative">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-xl"
              />
              <label className="absolute bottom-0 right-0 bg-black/70 p-1 rounded-full cursor-pointer hover:bg-black">
                <Camera className="text-white" size={18} />
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 pb-6 text-center">
          <h2 className="text-2xl font-semibold text-white drop-shadow-md">
            John Doe
          </h2>
          <p className="text-white/80 text-sm">Full Stack Developer</p>
        </div>

        {/* User Details */}
        <div className="px-8 py-6 text-white space-y-4">
          <div className="flex items-center">
            <User className="mr-3 text-cyan-300" size={20} />
            <span>John Doe</span>
          </div>
          <div className="flex items-center">
            <Mail className="mr-3 text-cyan-300" size={20} />
            <span>johndoe@example.com</span>
          </div>
          <div className="flex items-center">
            <Phone className="mr-3 text-cyan-300" size={20} />
            <span>+123 456 7890</span>
          </div>

          {/* Enrolled Courses */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold flex items-center text-white">
              <BookOpen className="mr-2 text-yellow-400" size={22} />
              Enrolled Courses
            </h3>
            <div className="mt-3 space-y-3">
              {[
                { name: "React Development", color: "green" },
                { name: "Node.js Backend", color: "green" },
                { name: "UI/UX Design", color: "yellow" },
              ].map((course, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-white/20 p-3 rounded-xl backdrop-blur-sm shadow-sm hover:bg-white/30 transition"
                >
                  <span className="text-white">{course.name}</span>
                  <CheckCircle
                    className={`text-${course.color}-400`}
                    size={20}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Edit Profile Button */}
          <button className="mt-6 w-full flex items-center justify-center bg-white/20 hover:bg-white/30 text-white py-2 rounded-xl transition backdrop-blur-sm shadow hover:scale-105">
            <Edit className="mr-2" size={20} />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
