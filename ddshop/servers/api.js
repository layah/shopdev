var express = require('express');
var router = express.Router();
// 引入文件模块
var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ly528212',
  port: '3306',
  database: 'dev',
});
connection.connect();

const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
// 引入处理post数据的模块
const bodyParser = require('body-parser')
// 引入Express
const app = express();
app.set('views', path.join(__dirname, 'index'));
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '/')))
// 因为是单页应用 所有请求都走/dist/index.html
app.post('/login/user',function (req,res) {
  var addSql = 'SELECT * FROM user1 WHERE username =? ';
  connection.query(addSql,[req.body.username],function (err, result){
    if(err){
      console.log(err);
      return;
    }
    else{
      res.json(result);
    }
  });
  connection.end();
})
app.get('/login',function(req,res){

  console.log("爬虫")
  var $;
  request('http://localhost:8080/trade/business/protocol', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cherrio.load(body); //当前的$符相当于拿到了所有的body里面的选择器
      $('.fm-box').find('form').attr("action",'/api/login/user')
      res.send( $("#login").html())
    }

  })
})
app.listen(8082);
console.log("服务启动")
module.exports = router;
