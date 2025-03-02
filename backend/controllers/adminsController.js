const Admin = require("../models/adminsModel");
const {sendForgetPasswordURL,sendWelcomeEmail,sendApprovalEmail} = require('../middleware/emailSendMiddleware')
const handleAdminSignup = async (req, res) => {
  try {
    const { fullName, email, password, contactNumber, gender, role, uniqueId, year, department, residenceType, hostelName, hallName, address } = req.body;
    const profileImageURL = req.file ? req.file.path : "/uploads/default.png";

    // Role-based validation
    if (!fullName || !email || !password || !contactNumber || !gender || !role) {
      return res.status(400).json({ message: "Full Name, Email, Password, Contact, Gender, and Role are required." });
    }

    if (role === "PIC" && !uniqueId) {
      return res.status(400).json({ message: "Unique ID is required for PIC." });
    }

    if (role === "Volunteer") {
      if (!year || !department || !residenceType) {
        return res.status(400).json({ message: "Year, Department, and Residence Type are required for Volunteers." });
      }

      if (residenceType === "Hostel" && !hostelName) {
        return res.status(400).json({ message: "Hostel name is required for Hostel residents." });
      }

      if (residenceType === "Hall" && !hallName) {
        return res.status(400).json({ message: "Hall name is required for Hall residents." });
      }

      if (residenceType === "Day Scholar" && !address) {
        return res.status(400).json({ message: "Address is required for Day Scholars." });
      }
    }

    //if Admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists with this email." });
    }

    const newAdmin = new Admin({
      fullName,
      email,
      password,
      contactNumber,
      gender,
      role,
      uniqueId: role === "PIC" ? uniqueId : undefined, // Only for PIC
      year: role === "Volunteer" ? year : undefined,
      department: role === "Volunteer" ? department : undefined,
      residenceType: role === "Volunteer" ? residenceType : undefined,
      hostelName: residenceType === "Hostel" ? hostelName : undefined,
      hallName: residenceType === "Hall" ? hallName : undefined,
      address: residenceType === "Day Scholar" ? address : undefined,
      profileImageURL,
      isApproved: false, // Needs approval from Admin or who incharge of websites 
    });

    await newAdmin.save();
    await sendApprovalEmail(newAdmin.email,newAdmin.fullName);
    res.status(201).json({ message: "Signup successful. Waiting for approval or You should be approved by Admin or who incharge of websites" });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const handleAdminSignin = async (req, res) => {
    const { email, password } = req.body;
    try {
      
      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(404).json({ success: false, message: "Admin not found" });
      }
  
      // Check if admin is approved
      if (!admin.isApproved) {
        return res.status(403).json({ success: false, message: "Admin approval pending. Contact the PIC or Admin." });
      }
      const token = await Admin.matchPasswordAndGenerateToken(email, password);
  
      if (!token) {
        throw new Error("Token generation failed");
      }
  
      return res.status(200).json({ success: true, token });
    } catch (error) {
      console.error("Error sign-in:", error);
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  };
const handleAdminLogout = async (req, res) => {
    res.clearCookie("token"); 
    res.status(200).json({ message: "Logged out successfully" });
};

const handleUpdateAdmin = async (req, res) => {
    const { adminId } = req.params;
    const { contactNumber, year, department, residenceType, hostelName, hallName, address } = req.body;
  
    try {
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      admin.contactNumber = contactNumber || admin.contactNumber;
  
      //  Volunteer
      if (admin.role === "Volunteer") {
        admin.year = year || admin.year;
        admin.department = department || admin.department;
        admin.residenceType = residenceType || admin.residenceType;
  
        if (residenceType === "Hostel") {
          admin.hostelName = hostelName || admin.hostelName;
        }
        if (residenceType === "Hall") {
          admin.hallName = hallName || admin.hallName;
        }
        if (residenceType === "Day Scholar") {
          admin.address = address || admin.address;
        }
      }
  
      if (req.file) {
        admin.profileImageURL = req.file.path;
      }
  
      await admin.save();
      return res.status(200).json({ message: "Profile updated successfully", admin });
    } catch (error) {
      console.error("Error updating admin/PIC: ", error);
      return res.status(500).json({ message: "Server error" });
    }
  };

const handleAdminForgetPassword = async (req, res) => {
    const { email } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Generate Reset Token (valid for 1 hour)
    const resetToken = JWT.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send Reset Email
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendForgetPasswordURL(admin.email, resetURL);

    return res.status(200).json({ message: "Forget password link sent to your email" });
  } catch (error) {
    console.error("Error in forgot password: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};
const handleAdminResetPassword = async (req, res) => {
    const { resetToken } = req.params;
    const { newPassword } = req.body;
  
    try {
      const decoded = JWT.verify(resetToken, process.env.JWT_SECRET);
      const admin = await Admin.findById(decoded.adminId);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      // Update Password
      admin.password = newPassword;
      await admin.save();
  
      // Send Welcome Email after password reset
      await sendWelcomeEmail(admin.email, admin.fullName);
  
      return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      console.error("Error resetting password: ", error);
      return res.status(500).json({ message: "Server error" });
    }
  };

  const handleAdminChangePassword = async (req, res) => {
    const { adminId } = req.params;
    const { oldPassword, newPassword } = req.body;
  
    try {
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      // Compare old password
      const isMatch = await bcrypt.compare(oldPassword, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect old password" });
      }
  
      // Hash new password before saving
      const saltRounds = 10;
      admin.password = await bcrypt.hash(newPassword, saltRounds);
      await admin.save();
  
      return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
module.exports = {
    handleAdminSignup,
    handleAdminSignin,
    handleAdminLogout,
    handleUpdateAdmin,
    handleAdminForgetPassword,
    handleAdminResetPassword,
    handleAdminChangePassword
}