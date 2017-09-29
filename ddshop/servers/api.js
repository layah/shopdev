// 引入文件模块
var mysql  = require('mysql');
module.exports = mysql.createPool({
  host     : '47.95.115.235',
  user     : 'root',
  password : 'ly528212',
  port: '3306',
  database: 'dev',
});


