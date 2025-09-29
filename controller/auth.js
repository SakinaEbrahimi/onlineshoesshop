const User = require('../models/user');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mailer = require('nodemailer');
const mailTransport = require('nodemailer-sendgrid-transport');
const transporter = mailer.createTransport(mailTransport({
    auth:{
        api_key:
        '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'
    }
}));
const { validationResult} = require('express-validator/check')

exports.getLogin = (req, res, next)=>{

    let message = req.flash('err')
    if(message.length>0){
        message = message[0]
    }
    else{
        message = null;
    }
    res.render('./auth/login.ejs',{
        pagetitle:"Login",
        path:"/login",
        isAuthenticated: false,
        errmessage: message
    })
}

exports.postLogin = (req, res, next)=>{

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email})
    .then((user)=>{
        if(!user){
            req.flash('err', 'Invaled email and password!...')
            return res.redirect('/login')
        }
        return bcrypt.compare(password, user.password)
        .then((domatch)=>{
            if(domatch){
                req.session.isLoggedin = true;
                req.session.user = user;
                return req.session.save(err =>{
                    console.log(err)
                    res.redirect('/reportwomen')
                });                
            }
            req.flash('err', 'Invaled password!...')
            return res.redirect('/login')
        })

        .catch(err =>{
            console.log(err);
            res.redirect('/login')
        })   
    })
}
exports.getSignUp = (req, res, next)=>{

    let mess = req.flash('error')
    if(mess.length>0){
        mess = mess[0];
    }
    else{
        mess = null;
    }
    res.render('./auth/signup.ejs',{
        pagetitle:"SignUp",
        path:"/signup",
        errmessage: mess,
        oldemail : '',
        oldpass : '',
        oldconfpass : ''
    })
}

exports.postSignUp = (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const confpssw = req.body.confpass;

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.render('./auth/signup.ejs',{
            pagetitle:"SignUp",
            path:"/signup",
            errmessage: errors.array()[0].msg,
            oldemail : email,
            oldpass : password,
            oldconfpass : confpssw
        })
    }

    User.findOne({email: email})
    .then((emailDoc)=>{
        if(emailDoc){
            req.flash('error', 'Email Existed!...')
            return res.redirect('/signup')
        }

        return bcrypt.hash(password,12)
        .then((hashpass)=>{
            const user = new User({
                email:email,
                password: hashpass,
                cart: {items:[]}
            })
            return user.save()
        })
        .catch(err => console.log(err))
        
        .then((resutl)=>{
            res.redirect('/login')})
        .catch(err => console.log(err))
    })

}

exports.postLogOut = (req,res,next)=>{
    req.session.destroy(err =>{
        console.log(err);
        res.redirect('/women')
    })
}

exports.postReset = (req, res, next)=>{
   crypto.randomBytes(32, (err, buffer)=>{
    if(err){
        console.log(err)
        return res.redirect('/reset')
    }
    const resetToken = buffer.toString('hex')

    User.findOne({email: req.body.resemail})
    .then((user)=>{
        if(!user){
            console.log(' user not')
            return res.redirect('/login')
        }

        user.resetToken = resetToken;
        user.resetExpira = Date.now()+3600000;
        return user.save();
    })
    .then(result => {
        res.redirect('/');
        transporter.sendMail({
            to: req.body.resemail,
            from: "skinaebrahiey986@gmail.com",
            subject: "Reset Password",
            html: "Please click here <a href='http://localhost:3000/reset"+resetToken+"'> Reset Password</a>"
        })
    })
   }) 
}