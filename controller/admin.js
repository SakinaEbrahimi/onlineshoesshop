const women = require('../models/women');
const men = require('../models/men.js')
const Kids = require('../models/kids');
const kids = require('../models/kids');
const contact = require('../models/contact')

exports.getEditWomen = (req, res) =>{
    const id = req.params.id;
    
    women.findById(id)
    .then((w)=>{
        res.render('./admin/editwomen.ejs',{
            pagetitle:"Edit Products",
            path:"Edit Product",
            product: w,
        })
    })
    .catch(err => console.log(err))
    
}
exports.postEditWomen = (req, res, next)=>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.file;
    const imageUrl = image.path
    const color = req.body.color;
    const size = req.body.size;
    const off = req.body.off;
    const id = req.body.productId;

    women.findById(id)
    .then((pro)=>{
        pro.title = title;
        pro.price = price;
        pro.description = description;
        pro.imageUrl = imageUrl;
        pro.color = color;
        pro.size = size;
        pro.off = off;
        return pro.save()
    })
    .then(()=>{
        res.redirect('/reportwomen')
    })
    .catch((error)=>{
        console.log(error)
    })
} 

exports.postDeletProducts = (req, res, next) =>{
    const id = req.body.productId;

    women.findByIdAndRemove(id)
    .then(()=>{
        res.redirect('/reportwomen')
    })
    .catch( err => console.log(err))
}

exports.postDeletMen = (req, res, next) =>{
    const id = req.body.productId;

    men.findByIdAndRemove(id)
    .then(()=>{
        res.redirect('/reportmen')
    })
    .catch( err => console.log(err))
}
exports.postDeletKids = (req, res, next) =>{
    const id = req.body.productId;

    Kids.findByIdAndRemove(id)
    .then(()=>{
        res.redirect('/reportkids')
    })
    .catch( err => console.log(err))
}

exports.getAddWomen = (req, res, next)=>{
    res.render('./admin/addwomen.ejs')
}
exports.postAddWomen = (req, res, next)=>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.file;
    const size = req.body.size;
    const off = req.body.off;
    const color = req.body.color;
    const imageUrl = image.path
    const woman = new women({
        title:title,
        price:price,        
        description: description,
        imageUrl: imageUrl,
        off: off,
        color: color,
        size: size,
        userId: req.user._id
    })
    woman.save()
    .then(()=>{
        res.redirect('/addwomen')
    })
    .catch((error)=>{
        console.log(error)
    })

} 
exports.getAddKids = (req, res, next)=>{
    res.render('./admin/addkids.ejs')
}
exports.postAddKids = (req, res, next)=>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.file;
    const size = req.body.size;
    const off = req.body.off;
    const color = req.body.color;
    const imageUrl = image.path
    const kids = new Kids({
        title:title,
        price:price,
        size:size,
        off:off,
        color:color,
        description: description,
        imageUrl: imageUrl,
        userId: req.user._id
    })
    kids.save()
    .then(()=>{
        res.redirect('/addkids')
    })
    .catch((error)=>{
        console.log(error)
    })

} 
exports.getEditKids = (req, res) =>{
    const id = req.params.id;
    
    Kids.findById(id)
    .then((k)=>{
        res.render('./admin/editkids.ejs',{
            pagetitle:"Edit Products",
            path:"Edit Product",
            product: k,
        })
    })
    .catch(err => console.log(err))    
}
exports.postEditKids = (req, res, next)=>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.file;
    const imageUrl = image.path;
    const id = req.body.productId;
    const color = req.body.color;
    const size = req.body.size;
    const off = req.body.off;

    kids.findById(id)
    .then((pro)=>{
        pro.title = title;
        pro.price = price;
        pro.description = description;
        pro.imageUrl = imageUrl;
        pro.color = color;
        pro.size = size;
        pro.off = off;

        return pro.save()
    })
    .then(()=>{
        res.redirect('/reportkids')
    })
    .catch((error)=>{
        console.log(error)
    })
} 
exports.getAddmen = (req, res, next)=>{
    res.render('./admin/addman.ejs')
}
exports.postAddmen = (req, res, next)=>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.file;
    const size = req.body.size;
    const off = req.body.off;
    const color = req.body.color;
    const imageUrl = image.path
    const man = new men({
        title:title,
        price:price,
        size: size,
        off: off,
        color: color,
        description: description,
        imageUrl: imageUrl,
        userId: req.user._id
    })
    man.save()
    .then(()=>{
        res.redirect('/addmen')
    })
    .catch((error)=>{
        console.log(error)
    })

} 
exports.getEditMen = (req, res) =>{
    const id = req.params.id;
    
    men.findById(id)
    .then((m)=>{
        res.render('./admin/editmen.ejs',{
            pagetitle:"Edit Products",
            path:"Edit Product",
            product: m,
        })
    })
    .catch(err => console.log(err))    
}
exports.postEditMen = (req, res, next)=>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.file;
    const imageUrl = image.path;
    const id = req.body.productId;
    const color = req.body.color;
    const size = req.body.size;
    const off = req.body.off;

    men.findById(id)
    .then((pro)=>{
        pro.title = title;
        pro.price = price;
        pro.description = description;
        pro.imageUrl = imageUrl;
        pro.color = color;
        pro.size = size;
        pro.off = off;

        return pro.save()
    })
    .then(()=>{
        res.redirect('/reportmen')
    })
    .catch((error)=>{
        console.log(error)
    })
} 
exports.postContact = (req,res, next)=>{
    const email = req.body.email;
    const description = req.body.description

    const contac = new contact ({
        email: email,
        description: description
    })
    contac.save()
    .then(()=>{
        res.redirect('/women')
    })
    .catch(err => console.log(err))
}