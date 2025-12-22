import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MenuBar from "./components/MenuBar";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import Home from "./pages/Home";
import About from "./pages/About";

import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Catalog from "./pages/Catalog"; 
import courseCatalogo from './components/courseCatalogo';
import Comparison from "./pages/Comparison";
import ComparisonTable from "./pages/ComparisonTable";
import DataTable from "./pages/DataTable";
import Forms from "./pages/Forms";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Security from "./pages/Security";
import Help from "./pages/Help";
import Search from "./pages/Search"

import Infographics from "./pages/Infographics";
import AudioVideo from "./pages/Video";
import Animation from "./pages/Animation";
import DragDrop from "./pages/DragDrop";
import Editor from "./pages/Editor";
import ShoppingCart from "./pages/ShoppingCart";
import Calendar from "./pages/Calendar"
import Audio from "./pages/Audio";

import Style1 from "./pages/Style1"
import Style2 from "./pages/Style2"
import Profile1 from "./pages/Profile1";
import Login1 from "./pages/Login1";
import Signup1 from "./pages/Signup1"
import Catalogo1 from "./pages/Catalogo1"
import Comparison1 from "./pages/Comparison1"
import Search1 from "./pages/Search1";
import Infographics1 from "./pages/Infographics1";
import ComparisonTable1 from "./pages/ComparisonTable1"
import NotificationPage from "./pages/NotificationPage";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <Header />
      <MenuBar onSearch={setSearchQuery} />
      <div className="flex">
        <LeftSidebar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/style1" element={<Style1/>}/>
            <Route path="/style2" element={<Style2/>}/>

            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/catalog" element={<Catalog searchQuery={searchQuery} />}/>
            <Route path="/coursecatalog" element={<courseCatalogo />} />

             <Route path="/comparison" element={<Comparison />} />
             <Route path="/comparisontable" element={<ComparisonTable />} />
             <Route path="/datatable" element={<DataTable />} />
             <Route path="/forms" element={<Forms />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/security" element={<Security />} />
            <Route path="/help" element={<Help />} />
            <Route path="/search" element={<Search />} />
            <Route path="/audio" element={<Audio />} />

            <Route path="/infographics" element={<Infographics />} />
            <Route path="/video" element={<AudioVideo />} />
            <Route path="/animation" element={<Animation />} />
            <Route path="/drag-drop" element={<DragDrop />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/calendar" element={<Calendar />} />

            <Route path="/Profile1" element={<Profile1/>}/>
            <Route path="/Login1" element={<Login1/>}/>
            <Route path="/signup1" element={<Signup1/>}/>
            <Route path="/Catalogo1" element={<Catalogo1/>}/>
            <Route path="/comparison1" element={<Comparison1 />} />
            <Route path="/Search1" element={<Search1/>}/>
            <Route path="/infographics1" element={<Infographics1/>}/>
            <Route path="/ComparisonTable1" element={<ComparisonTable1/>}/>

            <Route path="/NotificationPage" element={<NotificationPage/>}/>

          </Routes>
        </main>
        <RightSidebar />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
