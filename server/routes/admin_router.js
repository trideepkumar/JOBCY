const express = require('express')
const router =  express.Router();
const {adminLogin, adminSignup,getTotalUsers,totalusersbyMonth,totalOrganizationsByMonth,totalPostsJobs,organisationPdf,jobReportPdf,getUsers,blockUser,unBlockuser,getOrganisations,blockOrganization,unblockOrganisation} = require("../controllers/admin")

router.get('/users',getUsers)
router.get('/organisations',getOrganisations)
router.get('/getTotalUsers',getTotalUsers)
router.get('/total-users-by-month',totalusersbyMonth)
router.get('/total-organisation-by-month',totalOrganizationsByMonth)
router.get('/total-posts-jobs',totalPostsJobs)
router.get('/generate-organisation-pdf',organisationPdf)
router.get('/get-job-pdf',jobReportPdf)



router.post('/signup',adminSignup)
router.post('/login',adminLogin)


router.patch('/blockuser',blockUser)
router.patch('/unblockuser',unBlockuser)
router.patch('/blockorganisation',blockOrganization)
router.patch('/unblockorganisation',unblockOrganisation)




module.exports  = router