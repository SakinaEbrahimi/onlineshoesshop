const product = require('../models/product')
const Category = require('../models/contact')
const women = require('../models/women')
const men = require('../models/men')
const kids = require('../models/kids')
const mailer = require('nodemailer');
const mailTransport = require('nodemailer-sendgrid-transport');
const transporter = mailer.createTransport(mailTransport({
    auth:{
        api_key:
        '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'
    }
}));
const Iten_Per_Page = 6;

exports.getReportWomen = (req, res) =>{
    women.find()
     .then((w)=>{
         res.render('./report/womenreport.ejs',{
            pagetitle:"Report",
            path:"/reportwomen",
            products:w,
         })
     })
     .catch(err => console.log(err))
 
 }
 exports.getReportMen = (req, res) =>{
    men.find()
     .then((m)=>{
         res.render('./report/reportmen.ejs',{
            pagetitle:"Report",
            path:"/reportwomen",
            products:m,
         })
     })
     .catch(err => console.log(err))
 
 }
 exports.getReportKids = (req, res) =>{
    kids.find()
     .then((k)=>{
         res.render('./report/reportkids.ejs',{
            pagetitle:"Report",
            path:"/reportwomen",
            products:k,
         })
     })
     .catch(err => console.log(err))
 
 }

exports.getWomen = (req, res,next)=>{
    const page = +req.query.page || 1;
    let man
    let kid
    men.find()
    .then((m)=>{
        man = m
    })
    kids.find()
    .then((k)=>{
        kid = k
    })
    let totalItem

    women.find().countDocuments()
    .then( number => {
        totalItem = number;

        return women.find().skip((page-1)*Iten_Per_Page)
        .limit(Iten_Per_Page)
    })
    
    .then((women)=>{
        res.render('./report/women.ejs',{
            women : women,
            man: man,
            kids: kid,
            currentPage: page,
            nextPage: page+1,
            prePage: page-1,
            lastPage: Math.ceil(totalItem/Iten_Per_Page)  ,
            hasNextPage: Iten_Per_Page*page < totalItem,
            hasPrePage: page>1
        })
    })
    .catch(err => console.log(err))
}
exports.getMen = (req, res,next)=>{
    const page = +req.query.page || 1;

    let woman
    let kid
    women.find()
    .then((w)=>{
        woman = w
    })
    kids.find()
    .then((k)=>{
        kid = k
    })
    let totalItem

    men.find().countDocuments()
    .then( number => {
        totalItem = number;

        return men.find().skip((page-1)*Iten_Per_Page)
        .limit(Iten_Per_Page)
    })
    .then((m)=>{
        res.render('./report/men.ejs',{
            women : woman,
            man: m,
            kids: kid,
            currentPage: page,
            nextPage: page+1,
            prePage: page-1,
            lastPage: Math.ceil(totalItem/Iten_Per_Page)  ,
            hasNextPage: Iten_Per_Page*page < totalItem,
            hasPrePage: page>1
        })
    })
    .catch(err => console.log(err))
}
exports.getKids = (req, res,next)=>{
    const page = +req.query.page || 1;

    let woman
    let man
    women.find()
    .then((w)=>{
        woman = w
    })
    men.find()
    .then((m)=>{
        man = m
    })
    let totalItem

    kids.find().countDocuments()
    .then( number => {
        totalItem = number;

        return kids.find().skip((page-1)*Iten_Per_Page)
        .limit(Iten_Per_Page)
    })
    .then((k)=>{
        res.render('./report/kids.ejs',{
            women : woman,
            man: man,
            kids: k,
            currentPage: page,
            nextPage: page+1,
            prePage: page-1,
            lastPage: Math.ceil(totalItem/Iten_Per_Page)  ,
            hasNextPage: Iten_Per_Page*page < totalItem,
            hasPrePage: page>1
        })
    })
    .catch(err => console.log(err))
}
exports.getWomenDetails = (req, res,next) =>{
    const id = req.params.womenId
    // console.log(id)
    women.findById(id)
    .then((w)=>{
        res.render('./report/womenDetails.ejs',{
            pagetitle:"Details",
            path:"/details",
            woman: w
        })
    })
 }
 exports.getMenDetails = (req, res,next) =>{
    const id = req.params.menId
    // console.log(id)
    men.findById(id)
    .then((w)=>{
        res.render('./report/manDetails.ejs',{
            pagetitle:"Details",
            path:"/details",
            man: w
        })
    })
        
 
 }
 exports.getKidDetails = (req, res,next) =>{
    const id = req.params.kidId
    kids.findById(id)
    .then((w)=>{
        res.render('./report/kidsDetails.ejs',{
            pagetitle:"Details",
            path:"/details",
            kid: w
        })
    })
        
 
 }
 exports.getContact = (req, res) =>{
         res.render('./report/Contact.ejs',{
            pagetitle:"contact",
            path:"/contact",
         })
     
 }