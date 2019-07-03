var express = require('express');
var router = express.Router();
var mysqlFunc=require('../mysql');
var multer  = require('multer');
var fs=require('fs');
var path=require('path');
var upload =multer({dest:'uploads/'}); // 文件储存路径
// 创建说明应该在哪里以及如何保存文件/图片的storage
// var Storage = multer.diskStorage({
// 	destination:'uploads/',
// 	filename: function (req, file, callback) {
// 		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
// 	}
// });
// var upload = multer({ storage: Storage }).array("imgUploader", 1); //Field name and max count

router.post('/api/uploader', upload.single('imgUploader'),(req, res, next) =>{
	//读取文件路径
	console.log(req.body.imgUploader)
    fs.readFile(req.file.path,(err,data)=>{
        //如果读取失败
		if(err){return res.send('上传失败')}
		//如果读取成功
		//声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
		let time=Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
		//拓展名
		let extname=req.file.mimetype.split('/')[1]
		//拼接成图片名
		let keepname=time+'.'+extname
		//三个参数
		//1.图片的绝对路径
		//2.写入的内容
		//3.回调函数
		fs.writeFile(path.join(__dirname,'../uploads/'+keepname),data,(err)=>{
			if(err){return res.send('写入失败')}
			// res.send({err:0,msg:'上传ok'})
			var query=req.body.imgUploader;
			var data=['/uploads/'+keepname,query[1],"more",null,query[0],query[2],query[3]]
			let  sql ='INSERT INTO `zl`.`more_right`(id,img_url,page,price,class,title,name,sign) VALUES (0,?,?,?,?,?,?,?)';
			mysqlFunc(sql,res,data)
		});
	})
});
// post
router.get('/api/index',(req,res,next)=>{
	let  sql = 'SELECT * FROM `zl`.`index`'; // 查询语句
	mysqlFunc(sql,res)
})
router.get('/api/login',(req,res,next)=>{
	let  sql = 'SELECT * FROM `zl`.`login`'; // 查询语句
	mysqlFunc(sql,res)
})
router.get('/api/banner',(req,res,next)=>{
	let  sql = 'SELECT * FROM `zl`.`banner`'; // 查询语句
	mysqlFunc(sql,res)
})
router.get('/api/more',(req,res,next)=>{
	let  sql = 'SELECT * FROM `zl`.`more`'; // 查询语句
	mysqlFunc(sql,res)
})
router.get('/api/more_right',(req,res,next)=>{
	let  sql = 'SELECT * FROM `zl`.`more_right`'; // 查询语句
	mysqlFunc(sql,res)
})

router.get('/api/up', function(req, res, next) {
	let  sql = 'SELECT * FROM `zl`.`up`'; // 查询语句
	mysqlFunc(sql,res)
});
// post
// 插入上来的
router.post('/api/p_more_right', function(req, res, next) {
	var query=req.query;
	var data=[query.img_url,query.title,query.page,query.price,query.class,query.name,query.sign]
	let  sql ='INSERT INTO `zl`.`more_right`(id,img_url,title,page,price,class,name,sign) VALUES (0,?,?,?,?,?,?,?)';
	mysqlFunc(sql,res,data)
});
module.exports = router;
