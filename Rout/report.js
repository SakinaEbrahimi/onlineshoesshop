const express = require('express');
const router = express.Router();
const contoller = require('../controller/report');

// router.get('/report', contoller.getReport);
router.get('/reportwomen', contoller.getReportWomen);
router.get('/reportmen', contoller.getReportMen);
router.get('/reportkids', contoller.getReportKids);
router.get('/women', contoller.getWomen);
router.get('/men', contoller.getMen);
router.get('/kids', contoller.getKids);
router.get('/detail/:womenId', contoller.getWomenDetails);
router.get('/detailMen/:menId', contoller.getMenDetails);
router.get('/detailKid/:kidId', contoller.getKidDetails);
router.get('/contact', contoller.getContact);

module.exports = router