import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Users, GraduationCap, Activity, Calendar, Award, Briefcase, CalendarClock } from "lucide-react";
import { BarChart } from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white h-full transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className={`text-lg font-bold ${!isSidebarOpen && "hidden"}`}>
            Admin Panel
          </h2>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-4 space-y-2">
          <SidebarItem to="/dashboard/volunteers" icon={<Users size={20} />} label="Volunteers" isOpen={isSidebarOpen} />
          <SidebarItem to="/dashboard/students" icon={<GraduationCap size={20} />} label="Students" isOpen={isSidebarOpen} />
          <SidebarItem to="/dashboard/alumni" icon={<Briefcase size={20} />} label="Alumni" isOpen={isSidebarOpen} />
          <SidebarItem to="/dashboard/activities" icon={<Activity size={20} />} label="Activities" isOpen={isSidebarOpen} />
          <SidebarItem to="/dashboard/festivals" icon={<Award size={20} />} label="Festivals" isOpen={isSidebarOpen} />
          <SidebarItem to="/dashboard/induction" icon={<Calendar size={20} />} label="Induction" isOpen={isSidebarOpen} />
          <SidebarItem to="/dashboard/analytics" icon={<BarChart size={20} />} label="Analytics" isOpen={isSidebarOpen} />

          {/* Pending Approval Section */}
          <div className="mt-6 border-t border-gray-700 pt-4">
            <SidebarItem to="/dashboard/pending-approval" icon={<CalendarClock size={20} />} label="Pending Approval" isOpen={isSidebarOpen} />
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ to, icon, label, isOpen }) => {
  return (
    <Link
      to={to}
      className="flex items-center space-x-2 p-3 text-white no-underline hover:bg-gray-800 transition duration-200"
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </Link>
  );
};

export default Dashboard;
