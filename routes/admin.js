var express = require('express');
var router = express.Router();
var product = require('./admin/product.js');

router.get('/',(req,res)=>{
    res.redirect('/admin/product');
})

router.use('/product',product)

router.use(function (req, res, next) {
    console.log(req.url)
    if (req.url == '/login' || req.url == '/login/doLogin' || req.url == '/myDelete') next();
    else {
        if (req.session.userinfo && req.session.userinfo.username != '') {
            // req.app.locals['userinfo'] = req.session.userinfo;
            next()
        } else {
            res.redirect('/login');
        }
    }
})



module.exports = router;