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
const {
  getAllVolunteer,
  getVolunteerById,
  handleAddVolunteer,
  handleUpdateVolunteer,
  handleDeleteVolunteer,
} = require("../controllers/volunteerController");
const {
  getAllStudents,
  getStudentById,
  handleAddStudents,
  handleUpdateStudent,
  handleDeleteStudent,
} = require("../controllers/studentController");
const {
  getAllFreshersInductions,
  getFreshersInductionById,
  handleAddFresherInduction,
  handleUpdateFresherInduction,
  handleDeleteFresherInduction,
} = require("../controllers/inductionController");
const {
  getAllFestivals,
  getFestivalById,
  handleAddFestival,
  handleUpdateFestival,
  handleDeleteFestival,
} = require("../controllers/festivalController");
const {
  getAllFarewell,
  getFarewellById,
  handleAddFarewell,
  handleUpdateFarewell,
  handleDeleteFarewell,
} = require("../controllers/farewellController");
const {
  getAllClothDonations,
  getClothDonationById,
  handleAddClothDonation,
  handleUpdateClothDonation,
  handleDeleteClothDonation,
} = require("../controllers/donationController");
const {
  getAllAlumni,
  getAlumniById,
  handleAddAlumni,
  handleUpdateAlumni,
  handleDeleteAlumni,
} = require("../controllers/alumniController");
const {
  getAllActivities,
  getActivityById,
  handleAddActivities,
  handleUpdateActivities,
  handleDeleteActivities,
  getAllPrograms,
  getProgramById,
  handleAddProgram,
  handleUpdateProgram,
  handleDeleteProgram,
} = require("../controllers/activitiesController");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../config/cloudinaryConfig");
const router = express.Router();

// for admin management
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
router.post("/reset-password/:resetToken", handleAdminResetPassword);
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
router.get(
  "/dashboard",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  getAdminDashboard
);

// for Volunteer management
router.get(
  "/dashboard/volunteers",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  getAllVolunteer
);
router.get(
  "/dashboard/volunteers",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  getVolunteerById
);
router.post(
  "/dashboard/volunteers/add-volunteers",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("coverImageURL"),
  handleAddVolunteer
);
router.put(
  "/dashboard/volunteers/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("coverImageURL"),
  handleUpdateVolunteer
);
router.delete(
  "/dashboard/volunteers/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteVolunteer
);

// for students management
router.get(
  "/dashboard/students",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  getAllStudents
);
router.get(
  "/dashboard/students",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  getStudentById
);
router.post(
  "/dashboard/volunteers/add-students",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("coverImageURL"),
  handleAddStudents
);
router.put(
  "/dashboard/students/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("coverImageURL"),
  handleUpdateStudent
);
router.delete(
  "/dashboard/students/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteStudent
);

//for induction  management
router.get(
  "/dashboard/events/freshersInductions",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  getAllFreshersInductions
);
router.get(
  "/dashboard/events/freshersInductions",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  getFreshersInductionById
);
router.post(
  "/dashboard/events/freshersInductions/add-freshersInduction",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleAddFresherInduction
);
router.put(
  "/dashboard/events/freshersInductions/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleUpdateFresherInduction
);
router.delete(
  "/dashboard/events/freshersInductions/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteFresherInduction
);

// for festival management
router.get("/dashboard/events/festivals", getAllFestivals);
router.get("/dashboard/events/festivals/:id", getFestivalById);
router.post(
  "/dashboard/events/festivals/add-festival",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 }, // Single cover image
    { name: "photos", maxCount: 2 }, // Up to 10 photos
    { name: "videos", maxCount: 2 }, // Up to 5 videos
  ]),
  handleAddFestival
);
router.put(
  "/dashboard/events/festivals/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleUpdateFestival
);
router.delete(
  "/dashboard/events/festivals/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteFestival
);

// for farewell management
router.get("/dashboard/events/farewells", getAllFarewell);
router.get("/dashboard/events/farewells/:id", getFarewellById);
router.post(
  "/dashboard/events/farewells/add-farewell",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleAddFarewell
);
router.put(
  "/dashboard/events/farewells/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleUpdateFarewell
);
router.delete(
  "/dashboard/events/farewell/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteFarewell
);

// for donation management
router.get("/dashboard/cloth-donations", getAllClothDonations);
router.get("/dashboard/cloth-donations/:id", getClothDonationById);
router.post(
  "/dashboard/cloth-donations/add-cloth-donation",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleAddClothDonation
);
router.put(
  "/dashboard/cloth-donations/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleUpdateClothDonation
);
router.delete(
  "/dashboard/cloth-donations/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteClothDonation
);

// for alumni management
router.get("/dashboard/alumni", getAllAlumni);
router.get("/dashboard/alumni/:id", getAlumniById);
router.post(
  "/dashboard/alumni/add-alumni",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("coverImageURL"),
  handleAddAlumni
);
router.put(
  "/dashboard/alumni/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("coverImageURL"),
  handleUpdateAlumni
);
router.delete(
  "/dashboard/alumni/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteAlumni
);

// for activities management
router.get("/dashboard/events/activities", getAllActivities);
router.get("/dashboard/events/activities/:id", getActivityById);
router.post(
  "/dashboard/events/activities/add-activities",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleAddActivities
);
router.put(
  "/dashboard/events/activities/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleUpdateActivities
);
router.delete(
  "/dashboard/events/activities/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteActivities
);

// for programs in activity like tug of war, musical chair in sports day
router.get("/dashboard/events/activities/:id/programs", getAllPrograms);
router.get("/dashboard/events/activities/:id/programs/:id", getProgramById);
router.post(
  "/dashboard/events/activities/:id/programs/add-programs",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleAddProgram
);
router.put(
  "/dashboard/events/activities/:id/programs/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.fields([
    { name: "coverImageURL", maxCount: 1 },
    { name: "photos", maxCount: 2 },
    { name: "videos", maxCount: 2 },
  ]),
  handleUpdateProgram
);
router.delete(
  "/dashboard/events/activities/:id/programs/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteProgram
);

module.exports = router;
