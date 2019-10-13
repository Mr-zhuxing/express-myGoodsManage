var express = require('express');
var fs = require('fs');
var multiparty = require('multiparty');
var router = express.Router();
var productmanageDb = require('../../modules/productmanageDB.js')

router.get('/',(req,res)=>{
    productmanageDb.find('product', {}, function (err, data) {
        res.render('admin/product/index.ejs', {
            list: data
        })
    })
})


router.get('/add',(req,res)=>{
    res.render('admin/product/add.ejs')
})
router.post('/doAdd', function (req, res) {
    var form = new multiparty.Form({
        "uploadDir": "upload"
    });
    form.parse(req, function (err, fields, files) {
        var title = fields.title[0];
        var price = fields.price[0];
        var fee = fields.fee[0];
        var description = fields.description[0];
        var pic = files.pic[0].path;
        productmanageDb.insert('product', {
            title,
            price,
            fee,
            description,
            pic
        }, function (err, result) {
            console.log('上传成功');
            res.redirect('/admin/product')
        })
    })
})

router.get('/edit', function (req, res) {
    var id = new productmanageDb.MongoID(req.query.id)
    productmanageDb.find('product', {
        '_id': id
    }, function (err, data) {
        res.render('admin/product/edit.ejs', {
            list: data
        })
    })

})

router.post('/doEdit', function (req, res) {
    var form = new multiparty.Form({
        'uploadDir': 'upload'
    })
    form.parse(req, function (err, fields, files) {
        // console.log(fields)
        // console.log(files)
        var id = productmanageDb.MongoID(fields.id[0]);
        var json2 = {
            ...fields
        };
        for (let key in json2) {
            json2[key] = json2[key][0];
        }
        json2['_id'] = productmanageDb.MongoID(json2['id'])
        delete json2['id'];
        delete json2['oldpic'];
        //判断是否上传新图片
        if (files.pic[0].originalFilename) {
            json2['pic'] = files.pic[0].path;
            fs.unlink(fields.oldpic[0], (err) => {})
        } else {
            fs.unlink(files.pic[0].path, (err) => {
                if (err)
                    console.log(err);
            });
        }
        productmanageDb.update('product', {
            '_id': id
        }, json2, function (err, data) {
            res.redirect('/admin/product');
        })
    })
})


router.get('/doDelete', function (req, res) {
    var id = productmanageDb.MongoID(req.query.id)
    productmanageDb.deleteOne('product', {
        '_id': id
    }, function (err, data) {
        fs.unlink(req.query.pic, (err) => {
            if (!err)
                console.log('删除成功')
        })
        res.redirect('/admin/product')
    })
})


module.exports = router;