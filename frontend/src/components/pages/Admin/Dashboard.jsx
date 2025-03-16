import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";
import {
  Menu,
  X,
  Users,
  Activity,
  Calendar,
  Award,
  Briefcase,
  CalendarClock,
  PartyPopper,
  ImagePlus,
  MessageSquare,
  BellRing
} from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [counts, setCounts] = useState({
    totalStudents: 0,
    totalVolunteers: 0,
    totalAlumni: 0,
    totalGalleryItems: 0,
    totalFestivals: 0,
    totalActivities: 0,
    totalFarewell: 0,
    totalInduction: 0,
    totalDonationDrive: 0,
  });
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");
  const [reportType, setReportType] = useState(""); // "email" or "pdf"
  

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/admin/dashboard/counts",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setCounts(response.data.counts); // <-- Correctly setting counts
        } else {
          console.error("API call unsuccessful:", response.data);
        }
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  const handleSendReport = async () => {
    if (!email) {
      toast.error("Please enter an email address!");
      return;
    }

    // Show loading toast
    const toastId = toast.loading("Sending report...");

    const url =
      reportType === "email"
        ? "http://localhost:8000/api/admin/dashboard/reportemail"
        : "http://localhost:8000/api/admin/dashboard/reportpdf";

    try {
      await axios.post(
        url,
        { email },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // Update toast to success
      toast.update(toastId, {
        render: "Report sent successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setShowEmailInput(false);
      setEmail("");
    } catch (error) {
      console.error(`Error sending ${reportType} report:`, error);

      // Update toast to error
      toast.update(toastId, {
        render: `Failed to send ${reportType} report.`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <Layout>
    <div className="flex h-screen bg-gray-100">
      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
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
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-4 space-y-2">
          <SidebarItem
            to="/admin/dashboard/add-volunteers"
            icon={<Users size={20} />}
            label="Add Volunteers"
            isOpen={isSidebarOpen}
          />
         <SidebarItem
            to="/admin/dashboard/add-students"
            icon={<Briefcase size={20} />}
            label="Add Students"
            isOpen={isSidebarOpen}
          />

          <SidebarItem
            to="/admin/dashboard/add-alumni"
            icon={<Briefcase size={20} />}
            label="Add Alumni"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/admin/dashboard/add-activities"
            icon={<Activity size={20} />}
            label="Add Activities"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/admin/dashboard/add-festivals"
            icon={<Award size={20} />}
            label="Add Festivals"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/admin/dashboard/add-freshersInduction"
            icon={<Calendar size={20} />}
            label="Add Induction"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/admin/dashboard/add-farewell"
            icon={<PartyPopper size={20} />}
            label="Add Farewell"
            isOpen={isSidebarOpen}
          />
           <SidebarItem
            to="/admin/dashboard/add-homePageImage"
            icon={<ImagePlus size={20} />}
            label="Add HomePageImage"
            isOpen={isSidebarOpen}
          />
           <SidebarItem
            to="/admin/dashboard/add-notification"
            icon={<BellRing size={20} />}
            label="Add Notification"
            isOpen={isSidebarOpen}
          />

          {/* Pending Approval Section */}
          <div className="mt-6 border-t border-gray-700 pt-4">
            <SidebarItem
              to="/admin/dashboard/pending-approvals"
              icon={<CalendarClock size={20} />}
              label="Pending Approval"
              isOpen={isSidebarOpen}
            />
             <SidebarItem
              to="/admin/dashboard/feedback"
              icon={<MessageSquare size={20} />}
              label="Feedbacks"
              isOpen={isSidebarOpen}
            />
            
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage students, volunteers, alumni, and more with ease.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <StatCard title="Students" count={counts.totalStudents} />
          <StatCard title="Volunteers" count={counts.totalVolunteers} />
          <StatCard title="Alumni" count={counts.totalAlumni} />
          <StatCard title="Gallery Items" count={counts.totalGalleryItems} />
          <StatCard title="Festivals" count={counts.totalFestivals} />
          <StatCard title="Activities" count={counts.totalActivities} />
          <StatCard title="Farewell Events" count={counts.totalFarewell} />
          <StatCard title="Induction Events" count={counts.totalInduction} />
          <StatCard title="Donation Drives" count={counts.totalDonationDrive} />
        </div>

       
        {/* Report Buttons */}
        <div className="mt-6 flex flex-col items-center gap-4">
          {!showEmailInput ? (
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setReportType("email");
                  setShowEmailInput(true);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                Get Email Report
              </button>

              <button
                onClick={() => {
                  setReportType("pdf");
                  setShowEmailInput(true);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
              >
                Get Pdf Report
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg w-64"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSendReport}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Send {reportType === "pdf" ? "PDF" : "Email"} Report
                </button>
                <button
                  onClick={() => setShowEmailInput(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>
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

// Stats Card Component
const StatCard = ({ title, count }) => {
  return (
    <div className="bg-white p-2 rounded-md shadow text-center">
      <h3 className="text-md font-medium text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-blue-500 mt-2">{count}</p>
    </div>
    
  );
};
export default Dashboard;
