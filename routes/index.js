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
	// GET
	/* GET home page. */
	router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
	});

module.exports = router;
