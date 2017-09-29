var express = require('express');
var router = express.Router();
var pool=require("../servers/api")
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("服务启动")
    var name="ly528212"
    var addSql = 'SELECT * FROM user_info WHERE username = '+ pool.escape('ly528212');
    pool.getConnection(function (err,connection) {
      console.log(connection)
        connection.query(addSql,function (err, result){
            if(err){
                console.log(err);
                return;
            }
            else{
               // res.json(result)
                res.render('index', { title: JSON.stringify(result) });
                connection.release();
            }
        });

    })
});
module.exports = router;
