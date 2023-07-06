const express = require('express')
const router =  express.Router();
const {adminLogin, adminSignup,getTotalUsers,totalusersbyMonth,totalOrganizationsByMonth,totalPostsJobs,organisationPdf} = require("../controllers/admin")

router.get('/getTotalUsers',getTotalUsers)
router.get('/total-users-by-month',totalusersbyMonth)
router.get('/total-organisation-by-month',totalOrganizationsByMonth)
router.get('/total-posts-jobs',totalPostsJobs)
router.get('/generate-organisation-pdf',organisationPdf)

router.post('/signup',adminSignup)
router.post('/login',adminLogin)




module.exports  = router