const express = require("express");
const checkForAuthenticationCookie = require("../middleware/authMiddleware");
const {
  handleAdminSignup,
  handleAdminSignin,
  handleAdminLogout,
  handleAdminForgetPassword,
  handleAdminResetPassword,
  handleAdminChangePassword,
  handleUpdateAdmin,
  getPendingAdminsApproval,
  handleRejectAdmin,
  handleApproveAdmin,
} = require("../controllers/adminsController");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../config/cloudinaryConfig");
const router = express.Router();
router.post("/signup", upload.single("profileImageURL"), handleAdminSignup);
router.post("/signin", handleAdminSignin);
router.post("/logout", handleAdminLogout);
router.put(
  "/update/:adminId",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("profileImageURL"),
  handleUpdateAdmin
);
router.post(
  "/forget-password",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleAdminForgetPassword
);
router.post(
  "/reset-password/:resetToken",
  handleAdminResetPassword
);
router.put(
  "/change-password/:adminId",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleAdminChangePassword
);
router.get(
  "/pending-approvals",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  getPendingAdminsApproval
);
router.put(
  "/approve/:adminId",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleApproveAdmin
);
router.delete(
  "/reject/:adminId",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleRejectAdmin
);

module.exports = router;
