const express = require('express');
const { handleAdminSignup, handleAdminSignin, handleAdminLogout, handleAdminForgetPassword, handleAdminResetPassword, handleAdminChangePassword, handleUpdateAdmin,getPendingAdminsApproval,handleRejectAdmin } = require("../controllers/adminsController");
const upload = require('../config/cloudinaryConfig');
const router = express.Router();
router.post('/signup',upload.single("profileImageURL"), handleAdminSignup);
router.post('/signin', handleAdminSignin);
router.post('/logout', handleAdminLogout);
router.put('/update',upload.single("profileImageURL"), handleUpdateAdmin)
router.post('/forget-password',handleAdminForgetPassword);
router.post('/reset-password', handleAdminResetPassword);
router.put('/change-password', handleAdminChangePassword);
router.get('/pending-approvals',getPendingAdminsApproval);
router.put('/approve/:adminId',handleApproveAdmin);
router.delete('/reject/:adminId',handleRejectAdmin);



module.exports = router;