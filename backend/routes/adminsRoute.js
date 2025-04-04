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
  getAdminDashboard,
  getAdminProfile,
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
const {
  getAllPhotosVideos,
  getAllPhotos,
  getPhotoById,
  getAllVideos,
  getVideoById,
  handleAddPhotos,
  handleAddVideos,
  handleDeletePhotos,
  handleDeletePhoto,
  handleDeleteVideos,
  handleDeleteVideo,
  handleAddFestivalPhotos,
  handleAddFestivalVideos,
  handleAddInductionPhotos,
  handleAddInductionVideos,
  handleAddFarewellPhotos,
  handleAddFarewellVideos,
  handleAddDonationPhotos,
  handleAddDonationVideos,
  handleAddActivitiesPhotos,
  handleAddActivitiesVideos,
  getFestivalPhotos,
  getFestivalVideos,
  getActivitiesPhotos,
  getActivitiesVideos,
  getInductionPhotos,
  getInductionVideos,
  getFarewellPhotos,
  getFarewellVideos,
  getDonationPhotos,
  getDonationVideos,
} = require("../controllers/galleryController");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const upload = require("../config/cloudinaryConfig");
const {
  handleSendAdminDashboardReportEmail,
  handleSendAdminDashboardReportPDF,
  handleSendVolunteerReportEmailEXCEL,
  handleSendVolunteerReportEmailPDF,
  handleSendStudentReportEmailPDF,
  handleSendStudentReportEmailEXCEL,
  handleSendAlumniReportEmailEXCEL,
  handleSendAlumniReportEmailPDF,
  handleSendAllReportsPDF,
  handleSendAllReportsExcel,
  getAdminDashboardCounts,
} = require("../controllers/adminReportController");
const {
  handleAddHomePageImage,
} = require("../controllers/homePageImageController");
const { getPublicFeedback } = require("../controllers/feedbackController");
const {
  handleAddNotification,
  handleDeleteNotification,
} = require("../controllers/notificationController");

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
router.post("/forget-password", handleAdminForgetPassword);
router.post("/reset-password/:resetToken", handleAdminResetPassword);
router.put(
  "/change-password/:adminId",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleAdminChangePassword
);
router.get(
  "/profile",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  getAdminProfile
);
router.get(
  "/dashboard/pending-approvals",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  getPendingAdminsApproval
);
router.put(
  "/dashboard/approve/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleApproveAdmin
);
router.delete(
  "/dashboard/reject/:id",
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
router.post(
  "/dashboard/reportemail",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleSendAdminDashboardReportEmail
);

router.get(
  "/dashboard/counts",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  getAdminDashboardCounts
);
router.get(
  "/dashboard/feedback",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  getPublicFeedback
);
router.post(
  "/dashboard/add-homePageImage",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("image"),
  handleAddHomePageImage
);
router.post(
  "/dashboard/add-notification",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("imageFile"),
  handleAddNotification
);
router.delete(
  "/dashboard/notification/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteNotification
);

//getAdminDashboardCounts
router.post(
  "/dashboard/reportpdf",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleSendAdminDashboardReportPDF
);
router.post(
  "/dashboard/allreportpdf",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleSendAllReportsPDF
);
router.post(
  "/dashboard/allreportexcel",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleSendAllReportsExcel
);
// for Volunteer management
router.post(
  "/dashboard/volunteers/reportexcel",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleSendVolunteerReportEmailEXCEL
);
router.post(
  "/dashboard/volunteers/reportpdf",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleSendVolunteerReportEmailPDF
);
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

router.post(
  "/dashboard/students/reportpdf",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleSendStudentReportEmailPDF
);
router.post(
  "/dashboard/students/reportexcel",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleSendStudentReportEmailEXCEL
);
router.get(
  "/dashboard/students",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  getAllStudents
);
router.get(
  "/dashboard/students/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  getStudentById
);
router.post(
  "/dashboard/students/add-students",
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
  upload.single("coverImageURL"),
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
  upload.single("coverImageURL"),
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
  upload.single("coverImageURL"),
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
  upload.single("coverImageURL"),
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
router.post(
  "/dashboard/alumni/reportexcel",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleSendAlumniReportEmailEXCEL
);
router.post(
  "/dashboard/alumni/reportpdf",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleSendAlumniReportEmailPDF
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
  upload.single("coverImageURL"),
  handleAddActivities
);
router.put(
  "/dashboard/events/activities/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("coverImageURL"),
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

// for gallery management
router.get("/dashboard/gallery", getAllPhotosVideos);
router.get("/dashboard/gallery/photos", getAllPhotos);
router.get("/dashboard/gallery/photos/:id", getPhotoById);
router.get("/dashboard/gallery/videos", getAllVideos);
router.get("/dashboard/gallery/videos/:id", getVideoById);
router.post(
  "/dashboard/gallery/photos/add-photos",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("photos"),
  handleAddPhotos
);
router.post(
  "/dashboard/gallery/videos/add-videos",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("videos"),
  handleAddVideos
);
router.delete(
  "/dashboard/gallery/photos",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeletePhotos
);
router.delete(
  "/dashboard/gallery/photos/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeletePhoto
);
router.delete(
  "/dashboard/gallery/videos",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteVideos
);
router.delete(
  "/dashboard/gallery/videos/:id",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  handleDeleteVideo
);

// add photos and videos

router.post(
  "/dashboard/festivalGallery/photos/add-photos",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("photos"),
  handleAddFestivalPhotos
);
router.post(
  "/dashboard/festivalGallery/videos/add-videos",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("videos"),
  handleAddFestivalVideos
);
router.post(
  "/dashboard/inductionGallery/photos/add-photos",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("photos"),
  handleAddInductionPhotos
);
router.post(
  "/dashboard/inductionGallery/videos/add-videos",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("videos"),
  handleAddInductionVideos
);

router.post(
  "/dashboard/farewellGallery/photos/add-photos",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("photos"),
  handleAddFarewellPhotos
);
router.post(
  "/dashboard/farewellGallery/videos/add-videos",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("videos"),
  handleAddFarewellVideos
);

router.post(
  "/dashboard/donationGallery/photos/add-photos",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("photos"),
  handleAddDonationPhotos
);
router.post(
  "/dashboard/donationGallery/videos/add-videos",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("videos"),
  handleAddDonationVideos
);

router.post(
  "/dashboard/activityGallery/photos/add-photos",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("photos"),
  handleAddActivitiesPhotos
);
router.post(
  "/dashboard/activityGallery/videos/add-videos",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["PIC", "Volunteer"]),
  upload.single("videos"),
  handleAddActivitiesVideos
);

router.get("/dashboard/gallery/festival/photos", getFestivalPhotos);
router.get("/dashboard/gallery/festival/videos", getFestivalVideos);


router.get("/dashboard/gallery/activities/photos", getActivitiesPhotos);
router.get("/dashboard/gallery/activities/videos", getActivitiesVideos);


router.get("/dashboard/gallery/induction/photos", getInductionPhotos);
router.get("/dashboard/gallery/induction/videos", getInductionVideos);


router.get("/dashboard/gallery/farewell/photos", getFarewellPhotos);
router.get("/dashboard/gallery/farewell/videos", getFarewellVideos);


router.get("/dashboard/gallery/donation/photos", getDonationPhotos);
router.get("/dashboard/gallery/donation/videos", getDonationVideos);

module.exports = router;
