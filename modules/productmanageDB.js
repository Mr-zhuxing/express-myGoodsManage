var MongoClient = require('mongodb').MongoClient;
var MongoID = require('mongodb').ObjectID;
var DbSUrl = 'mongodb://localhost:27017';

function __connectDb(callback){
    //连接数据库
    MongoClient.connect(DbSUrl,function(err,client){
        if(err){
            console.log(err);
            return;
        }
        var db = client.db('productmanage');
        callback(err,db);
        client.close();
    })
}

exports.find = function(collectionname,json,callback){
    __connectDb(function(err,db){
        var result = db.collection(collectionname).find(json);
        result.toArray(function(err,data){
            callback(err,data);
        })
    })
}
exports.insert = function(collectionname,json,callback){
    __connectDb(function(err,db){
        var result = db.collection(collectionname).insertOne(json,function(err,result){
            callback(err,result);
        });
    })
}
exports.update = function(collectionname,json1,json2,callback){
    __connectDb(function(err,db){
        var result = db.collection(collectionname).updateOne(json1,{$set:json2},function(err,data){
            callback(err,data);
        });
    })
}
exports.deleteOne = function(collectionname,json,callback){
    __connectDb(function(err,db){
        var result = db.collection(collectionname).deleteOne(json,function(err,data){
            callback(err,data);
        });
    })
}
exports.MongoID = MongoID;

