const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const adminRouter = require('./Rout/admin');
const reportRouter = require('./Rout/report');
const auth = require('./Rout/auth')
const ejs = require('ejs');
const Mongoose = require('mongoose');
const User = require('./models/user')
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer')
const mongoStore = require('connect-mongodb-session')(session)


const app = express();
const fileStorage = multer.diskStorage({
    destination: (req, file, cb )=>{
        cb(null, 'images')
    },
    filename:(req, file, cb) =>{
        cb(null, new Date().toISOString+"-"+file.originalname)
    }
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({ storage: fileStorage}).single('image'))

app.use(express.static(path.join(__dirname, 'public')));
app.use( '/images',express.static(path.join(__dirname, 'images')));
app.set('view engin', 'ejs')

const store = new mongoStore({
    uri:'mongodb://localhost:27017/newProduct',
    collection:'session'
  })

app.use(session({
    secret: "TopSecure",
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use((req, res, next)=>{
    if (!req.session.user) {
        if(req.session.user){
            User.findById(req.session.user._id)
            .then( user =>{
                req.user = user;
                next();
            })
        }
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

app.use(csrf());
app.use(flash())

app.use((req, res, next )=>{
    isAuthenticated = req.session.isLoggedin,
    csrfToken = req.csrfToken();
    
    next()
})
app.use(adminRouter);
app.use(reportRouter);
app.use(auth)

Mongoose.connect('mongodb://localhost:27017/newProduct')
.then(()=>{    
    app.listen(3000)
    console.log('Connected to MOngoDB')
})
.catch((err)=>{
    console.log(err)
})