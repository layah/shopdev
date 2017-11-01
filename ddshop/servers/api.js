// 引入文件模块
var mysql  = require('mysql');
module.exports = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'ly528212',
  port: '3306',
  database: 'dev',
});


