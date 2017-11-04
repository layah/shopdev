var express = require('express');
var app=express();
var router = express.Router();
var pool=require("../../servers/api")


module.exports =router.get('/home/list', function(req, res, next) {
    var listName=req.body.listname;
    var addSql = 'SELECT * FROM list';
    pool.getConnection(function (err,connection) {
        connection.query(addSql,function (err, result){
            if(err){
                return res.json(err);
            }
            else{
                res.status(200);
                if (result.length==0 || result==null || result==undefined){
                    return  res.json({
                        success:false,
                        message:"未查到相关数据"
                    });
                }
                else{
                    connection.release();
                    return res.json({
                        success:true,
                        data:result,
                        message:"执行成功"
                    }).end();
                }
            }
        });
    })
});