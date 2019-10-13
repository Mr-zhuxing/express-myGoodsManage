// var fs = require('fs');
var express = require('express');
var session = require('express-session')
// var bodyParser = require('body-parser')
// var productmanageDb = require('./modules/productmanageDB.js');
// var md5 = require('md5-node');
// var multiparty = require('multiparty');
var admin = require('./routes/admin.js');
var index = require('./routes/index.js')
//form表单设置enctype="multipart/form-data"时，body-parser req.body就不管用了




var app = new express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/upload', express.static('upload'));
// app.use(bodyParser.urlencoded({
//     extended: false
// }))
// app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
    },
    rolling: true
}))
// app.use(function (req, res, next) {
//     console.log(req.url)
//     if (req.url == '/login' || req.url == '/login/doLogin' || req.url == '/myDelete') next();
//     else {
//         if (req.session.userinfo && req.session.userinfo.username != '') {
//             app.locals['userinfo'] = req.session.userinfo;
//             next()
//         } else {
//             res.redirect('/login');
//         }
//     }
// })
app.use('/',index)
app.use('/admin',admin);






// app.get('/', function (req, res) {
//     res.redirect('/product');
// })

// app.get('/login', function (req, res) {
//     res.render('login.ejs');
// })
// app.post('/dologin', function (req, res) {
//     var username = req.body.username;
//     var password = md5(req.body.password);
//     productmanageDb.find('user', {
//         username,
//         password
//     }, function (err, data) {
//         if (data.length > 0) {
//             console.log('登录成功');
//             req.session.userinfo = data[0];
//             app.locals['userinfo'] = req.session.userinfo;
//             res.redirect('/product');
//         } else {
//             res.send("<script>alert('登录失败');location.href = '/login'</script>")
//         }
//     })
// })


// app.get('/product', function (req, res) {
//     productmanageDb.find('product', {}, function (err, data) {
//         res.render('product', {
//             list: data
//         })
//     })
// })
// app.get('/productadd', function (req, res) {
//     res.render('add.ejs')
// })
// app.post('/doProductAdd', function (req, res) {
//     var form = new multiparty.Form({
//         "uploadDir": "upload"
//     });
//     form.parse(req, function (err, fields, files) {
//         var title = fields.title[0];
//         var price = fields.price[0];
//         var fee = fields.fee[0];
//         var description = fields.description[0];
//         var pic = files.pic[0].path;
//         productmanageDb.insert('product', {
//             title,
//             price,
//             fee,
//             description,
//             pic
//         }, function (err, result) {
//             console.log('上传成功');
//             res.redirect('/product')
//         })
//     })


// })

// app.get('/productedit', function (req, res) {
//     var id = new productmanageDb.MongoID(req.query.id)
//     productmanageDb.find('product', {
//         '_id': id
//     }, function (err, data) {
//         res.render('edit', {
//             list: data
//         })
//     })

// })
// app.post('/doproductedit', function (req, res) {
//     var form = new multiparty.Form({
//         'uploadDir': 'upload'
//     })

//     form.parse(req, function (err, fields, files) {
//         // console.log(fields)
//         // console.log(files)
//         var id = productmanageDb.MongoID(fields.id[0]);
//         var josn2 = {
//             ...fields
//         };
//         for (let key in josn2) {
//             josn2[key] = josn2[key][0];
//         }
//         josn2['_id'] = productmanageDb.MongoID(josn2['id'])
//         delete josn2['id'];
//         //判断是否上传新图片
//         if (files.pic[0].originalFilename) {
//             josn2['pic'] = files.pic[0].path;
//         } else {
//             fs.unlink(files.pic[0].path, (err) => {
//                 if (err)
//                     console.log(err);
//             });
//         }
//         productmanageDb.update('product', {
//             '_id': id
//         }, josn2, function (err, data) {
//             fs.unlink(fields.oldpic[0], (err) => {})
//             res.redirect('/product');
//         })
//     })
// })

// app.get('/doproductdelete', function (req, res) {
//     var id = productmanageDb.MongoID(req.query.id)
//     productmanageDb.deleteOne('product', {
//         '_id': id
//     }, function (err, data) {
//         fs.unlink(req.query.pic, (err) => {
//             if (!err)
//                 console.log('删除成功')
//         })
//         res.redirect('/product')
//     })
// })

// //删除多余图片
// app.get('/myDelete', function (req, res) {
//     productmanageDb.find('product', {}, (err, data) => {
//         var pics = data.map((value, index) => {
//             return value.pic;
//         })
//         // console.log(pics);
//         fs.readdir('./upload', function (err, files) {
//             files = files.map((file, index) => {
//                 return 'upload\\' + file;
//             })
//             var deletFiles = files.filter((file1, index) => {
//                 var i = 0
//                 for (let file2 of pics) {
//                     if (file1 == file2) {
//                         break;
//                     } else {
//                         i++
//                     }
//                 }
//                 if (i == pics.length) {
//                     return true;
//                 } else {
//                     return false;
//                 }
//             })
//             // console.log(deletFiles);
//             while (deletFiles.length)
//                 fs.unlink(deletFiles.pop(), (err) => {});
//         })
//         res.send('myDelete')
//     })
// })



app.listen(3000, '127.0.0.1');