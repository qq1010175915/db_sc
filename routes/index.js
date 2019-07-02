var express = require('express');
var router = express.Router();
var mysqlFunc=require('../mysql')
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
