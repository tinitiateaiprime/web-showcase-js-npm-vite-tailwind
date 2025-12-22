import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  Briefcase,
  Phone,
  User,
  LogIn,
  UserPlus,
  ChevronDown,
  ChevronUp,
  Music2,
  Book,
} from "lucide-react";
import ProfileImage from "../assets/profile.png";


const LeftSidebar = () => {
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [signupDropdownOpen, setSignupDropdownOpen] = useState(false);
  const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
  const [comparisonDropdownOpen, setComparisonDropdownOpen] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [infographicsDropdownOpen, setInfographicsDropdownOpen] = useState(false);
  const [comparisonTableDropdownOpen, setComparisonTableDropdownOpen]=useState(false);


  return (
    <aside className="w-64 h-[200vh] bg-gray-900 text-white p-6 flex flex-col items-center shadow-lg overflow-y-auto">
      <div className="text-center mb-6">
        <img
          src={ProfileImage}
          alt="Profile"
          className="w-24 h-26 mx-auto rounded-full border-4 border-gray-700 shadow-md hover:scale-105 transition-transform duration-300"
        />
        <h2 className="mt-3 text-xl font-bold tracking-wide">My Project</h2>
      </div>

      <nav className="w-full">
        <ul className="flex flex-col space-y-4 text-lg font-semibold">

          {/* Home Dropdown */}
          <li>
            <button
              onClick={() => setHomeDropdownOpen(!homeDropdownOpen)}
              className="w-full flex items-center justify-between hover:text-gray-400 transition"
            >
              <span className="flex items-center space-x-3">
                <HomeIcon size={22} />
                <span>Home</span>
              </span>
              {homeDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {homeDropdownOpen && (
              <ul className="ml-8 mt-2 space-y-2 text-sm text-gray-300">
                <li><Link to="/" className="hover:text-white transition">Default Home</Link></li>
                <li><Link to="/style1" className="hover:text-white transition">Style 1</Link></li>
                <li><Link to="/style2" className="hover:text-white transition">Style 2</Link></li>
              </ul>
            )}
          </li>

          {/* Account Dropdown */}
          <li>
            <button
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              className="w-full flex items-center justify-between hover:text-gray-400 transition"
            >
              <span className="flex items-center space-x-3">
                <User size={22} />
                <span>Account</span>
              </span>
              {accountDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {accountDropdownOpen && (
              <ul className="ml-8 mt-2 space-y-2 text-sm text-gray-300">
                <li><Link to="/Profile" className="hover:text-white transition">Profile</Link></li>
                <li><Link to="/Profile1" className="hover:text-white transition">Profile 1</Link></li>
              </ul>
            )}
          </li>

          {/* Login Dropdown */}
          <li>
            <button
              onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
              className="w-full flex items-center justify-between hover:text-gray-400 transition"
            >
              <span className="flex items-center space-x-3">
                <LogIn size={22} />
                <span>Login</span>
              </span>
              {loginDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {loginDropdownOpen && (
              <ul className="ml-8 mt-2 space-y-2 text-sm text-gray-300">
                <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
                <li><Link to="/login1" className="hover:text-white transition">Login1</Link></li>
              </ul>
            )}
          </li>

          {/* Signup Dropdown */}
          <li>
            <button
              onClick={() => setSignupDropdownOpen(!signupDropdownOpen)}
              className="w-full flex items-center justify-between hover:text-gray-400 transition"
            >
              <span className="flex items-center space-x-3">
                <UserPlus size={22} />
                <span>Signup</span>
              </span>
              {signupDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {signupDropdownOpen && (
              <ul className="ml-8 mt-2 space-y-2 text-sm text-gray-300">
                <li><Link to="/signup" className="hover:text-white transition">Signup</Link></li>
                <li><Link to="/signup1" className="hover:text-white transition">Signup1</Link></li>
              </ul>
            )}
          </li>

          {/* Catalog Dropdown */}
          <li>
            <button
              onClick={() => setCatalogDropdownOpen(!catalogDropdownOpen)}
              className="w-full flex items-center justify-between hover:text-gray-400 transition"
            >
              <span className="flex items-center space-x-3">
                <Book size={22} />
                <span>Catalog</span>
              </span>
              {catalogDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {catalogDropdownOpen && (
              <ul className="ml-8 mt-2 space-y-2 text-sm text-gray-300">
                <li><Link to="/catalog" className="hover:text-white transition">Catalog</Link></li>
                <li><Link to="/Catalogo1" className="hover:text-white transition">Catalog1</Link></li>
              </ul>
            )}
          </li>

          <li><Link to="/services" className="flex items-center space-x-3 hover:text-gray-400 transition"><Briefcase size={22} /><span>Services</span></Link></li>

          {/* Search Dropdown */}
          <li>
          <button
          onClick={() => setSearchDropdownOpen(!searchDropdownOpen)}
          className="w-full flex items-center justify-between hover:text-gray-400 transition"
          >
         <span className="flex items-center space-x-3">
         🔍 <span>Search</span>
          </span>
          {searchDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {searchDropdownOpen && (
           <ul className="ml-8 mt-2 space-y-2 text-sm text-gray-300">
          <li><Link to="/search" className="hover:text-white transition">Search</Link></li>
         <li><Link to="/search1" className="hover:text-white transition">Search1</Link></li>
          </ul>
           )}
          </li>


          {/* Comparison Dropdown */}

          <li>
          <button
          onClick={() => setComparisonDropdownOpen(!comparisonDropdownOpen)}
          className="w-full flex items-center justify-between hover:text-gray-400 transition"
          >
          <span className="flex items-center space-x-3">
          📊 <span>Comparison</span>
          </span>
          {comparisonDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {comparisonDropdownOpen && (
          <ul className="ml-8 mt-2 space-y-2 text-sm text-gray-300">
          <li>
         <Link to="/comparison" className="hover:text-white transition">Comparison</Link>
         </li>
         <li>
         <Link to="/comparison1" className="hover:text-white transition">Comparison1</Link>
         </li>
         </ul>
         )}
         </li>
          
          <li>
          <button
          onClick={() => setComparisonTableDropdownOpen(!comparisonTableDropdownOpen)}
          className="w-full flex items-center justify-between hover:text-gray-400 transition"
          >
         <span className="flex items-center space-x-3">
          <span>📑 ComparisonTable </span>
          </span>
          {comparisonTableDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {comparisonTableDropdownOpen && (
           <ul className="ml-8 mt-2 space-y-2 text-sm text-gray-300">
           <li><Link to="/comparisontable" className="hover:text-gray-400 transition">📑 Comparison Table</Link></li>
           <li><Link to="/ComparisonTable1" className="hover:text-white transition"> ComparisonTable</Link></li>
          </ul>
           )}
          </li>


          <li><Link to="/forms" className="hover:text-gray-400 transition">📝 Forms</Link></li>
          <li><Link to="/datatable" className="hover:text-gray-400 transition">📋 Data Table</Link></li>

          <li>
          <button
          onClick={() => setInfographicsDropdownOpen(!infographicsDropdownOpen)}
          className="w-full flex items-center justify-between hover:text-gray-400 transition"
          >
         <span className="flex items-center space-x-3">
          <span>📈 Infographics</span>
          </span>
          {infographicsDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {infographicsDropdownOpen && (
           <ul className="ml-8 mt-2 space-y-2 text-sm text-gray-300">
          <li><Link to="/infographics" className="hover:text-white transition">infographics</Link></li>
         <li><Link to="/infographics1" className="hover:text-white transition">infographics1</Link></li>
          </ul>
           )}
          </li>

          <li><Link to="/video" className="hover:text-gray-400 transition">🎥 Video</Link></li>
          <li><Link to="/audio" className="flex items-center space-x-3 hover:text-gray-400 transition"><Music2 size={22} /><span>Audio</span></Link></li>
          <li><Link to="/animation" className="hover:text-gray-400 transition">🎞️ Animation</Link></li>
          <li><Link to="/drag-drop" className="hover:text-gray-400 transition">🖱️ Drag & Drop</Link></li>
          <li><Link to="/editor" className="hover:text-gray-400 transition">✏️ Online Editor</Link></li>
          <li><Link to="/shopping-cart" className="hover:text-gray-400 transition">🛒 Shopping Cart</Link></li>
          <li><Link to="/calendar" className="hover:text-gray-400 transition">📅 Calendar</Link></li>
          <li><Link to="/dashboard" className="hover:text-gray-400 transition">📊 Dashboard</Link></li>
          <li><Link to="/analytics" className="hover:text-gray-400 transition">📈 Analytics</Link></li>
          <li><Link to="/security" className="hover:text-gray-400 transition">🔒 Security</Link></li>
          <li><Link to="/about" className="flex items-center space-x-3 hover:text-gray-400 transition">ℹ️ <span>About</span></Link></li>
          <li><Link to="/help" className="hover:text-gray-400 transition">🆘 Help</Link></li>
          <li><Link to="/forgot-password" className="hover:text-gray-400 transition">🔑 Forgot Password</Link></li>
          <li><Link to="/coursecatalog" className="hover:text-gray-400 transition">🎓 Course Catalog</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default LeftSidebar;

