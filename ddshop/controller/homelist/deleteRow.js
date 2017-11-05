var express = require('express');
var app=express();
var router = express.Router();
var formidable = require("formidable"),
    fs = require("fs");
var pool=require("../../servers/api")
var cacheFolder = '/images/uploadcache/';

module.exports =router.post('/deleteRow', function(req, res, next) {
    var listName=req.body.id;
    var addSql = "DELETE FROM list WHERE id=?";
    pool.getConnection(function (err,connection) {
        connection.query(addSql,listName,function (err, result){
            if(err){
                return res.json(err);
            }
            else{
                connection.release();
                return res.json({
                    success:true,
                    message:"执行成功"
                }).status(200).end();
            }
        });
    })
});


function upload(req, res) {
    if (!fs.existsSync(cacheFolder)) {
        fs.mkdirSync(cacheFolder);
    }
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = cacheFolder; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
    form.type = true;
    var displayUrl;
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send(err);
            return;
        }
        var extName = ''; //后缀名
        switch (files.upload.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if (extName.length === 0) {
            res.send({
                code: 202,
                msg: '只支持png和jpg格式图片'
            });
            return;
        } else {
            var avatarName = '/' + Date.now() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            displayUrl = UPLOAD_FOLDER  + avatarName;
            fs.renameSync(files.upload.path, newPath); //重命名
            res.send({
                code: 200,
                msg: displayUrl
            });
        }
    });
};