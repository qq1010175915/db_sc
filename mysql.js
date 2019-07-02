var connction ={};
var $mysql   = require("mysql");
    connction.mysql = {
        host:"rm-wz90ms85f2amx39596o.mysql.rds.aliyuncs.com",           //这是数据库的地址
        port:"3306",
        user:"lzhsus",                  //需要用户的名字
        password:"Lzh951020",        //DBC09ba7a35c    //用户密码 ，如果你没有密码，直接双引号就是
        database:""           //数据库名字
    }                                //好了，这样我们就能连接数据库了
////////////////////当然这是不可能的
function queryFunc(sql,res) { 
	// 连接数据库
	var $sql = $mysql.createConnection(connction.mysql) 
	$sql.on('error',err=>err.code==='PROTOCOL_CONNECTION_LOST' && setTimeout(reconn,2000))
	$sql.connect(function (err) { 
		if(err) { 
			console.log('连接失败 Error: ' + err.message); 
			return; 
		  } 
		  console.log('连接成功：MySQL'); 
	 })
	$sql.query(sql,function (err, result) {
		if (err) return res.json({
			err_code: 1,
			message: '数据不存在',
			affextedRows: 0
		})
		res.json({
			err_code: 200,
			message: result,
			affextedRows: result.affextedRows
		})
	});
}
module.exports = queryFunc;  //用module.exports暴露出这个接口，