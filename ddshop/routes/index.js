var express = require('express');
var app=express();
var router = express.Router();
var pool=require("../servers/api")

/* GET home page. */
router.post('/login', function(req, res, next) {
    var username=req.body.username;
    var password=req.body.password;
    var addSql = 'SELECT * FROM user_info WHERE username = '+ pool.escape(username) +'OR password ='+pool.escape(password);
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
                        message:"账户不存在"
                    });

                }
                else{
                    if (result[0].username!==username){
                        return  res.json({
                            success:false,
                            message:"用户名错误"
                        });
                    }
                    else if (result[0].password!==password){
                        return  res.json({
                            success:false,
                            message:"密码错误"
                        });
                    }
                    else{
                        connection.release();
                        return res.json({
                            success:true,
                            message:"登录成功"
                        }).end();
                        next(res.redirect("/home"));
                    }
                }

            }
        });
    })
});
module.exports = router;
