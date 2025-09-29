const express = require('express');
const router = express.Router();
const path = require('path');
const contoller = require('../controller/auth')
const { body } = require('express-validator/check');
// const { values } = require('sequelize/types/lib/operators');

router.get('/login', contoller.getLogin);
router.post('/login',
body('erm')
, contoller.postLogin);
router.get('/signup', contoller.getSignUp);
router.post('/signup',
body('email','Please Enter Valid Email')
.isEmail()
.normalizeEmail(),
body('password','Please Enter a Password with only numbers and text and at least 5 characters')
.isAlphanumeric()
.isLength({min: 5}),
body('confpass')
.custom((value , {req})=>{
    if(value === req.body.password){
        return true
    }
    throw new Error('Password has to match.')
})
, contoller.postSignUp);
router.post('/logout', contoller.postLogOut);
router.post('/reset', contoller.postReset)

module.exports = router;
