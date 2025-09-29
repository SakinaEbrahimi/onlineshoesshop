const express = require('express');
const router = express.Router();
const path = require('path');
const contoller = require('../controller/admin');

router.post('/deleted', contoller.postDeletProducts);
router.post('/deletedMen', contoller.postDeletMen);
router.post('/deletedKids', contoller.postDeletKids);
router.get('/addwomen', contoller.getAddWomen);
router.post('/addwomen', contoller.postAddWomen);
router.get('/addmen', contoller.getAddmen);
router.post('/addmen', contoller.postAddmen);
router.get('/addkids', contoller.getAddKids);
router.post('/addkids', contoller.postAddKids);
router.get('/edit-women/:id', contoller.getEditWomen);
router.post('/edit-women', contoller.postEditWomen);
router.get('/edit-men/:id', contoller.getEditMen);
router.post('/edit-men', contoller.postEditMen);
router.get('/edit-kids/:id', contoller.getEditKids);
router.post('/edit-kids', contoller.postEditKids);
router.post('/contact', contoller.postContact);

module.exports = router;