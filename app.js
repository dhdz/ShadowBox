var express = require('express');//express node.js库
var path = require('path'); //路径??
var favicon = require('serve-favicon');//有关图标??
var logger = require('morgan');//express默认的日志中间件，也可以脱离express，作为node.js的日志组件单独使用。
var cookieParser = require('cookie-parser');//cookie不解释
var bodyParser = require('body-parser');//单独处理post请求
var fs =require('fs')
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


// view engine setup
//查看引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//将你的图标放置在/ public后取消注释
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 自定义模块
//  综合json请求
//返回json对象，msg为提示说明，
app.get("/data/json",(req,res)=>{
	res.header("Access-Control-Allow-Origin", "*");
	let json={state:"no"};
	if(req.query.id=="runewords") {
		fs.readFile("./json_box/Diablo2/Rune.json","utf-8",(err,file)=>{
			if(err){
				console.log('\x1b[41m /Diablo2/Rune.json文件没有找到')
				json.msg="然而并没有找到目标数据，服务器：怪我喽~";
			}else{
				json.state="ok";
				json.name=req.query.id;
		json.msg="暗黑破坏神2符文之语",
				json.gift=file;
			}
			res.send(JSON.stringify(json))
		})
	}else{
		let date =new Date();
		console.log('\x1b[43m 收到一个错误的请求,日期: '+date.toLocaleDateString()+" 时间: "+date.toLocaleTimeString())
		json.prompt="所请求的资源不存于现实世界";
		 res.send(JSON.stringify(json))
	}
})




//以下是如果没有找到静态文件就是用jade
// app.use('/', index);
// app.use('/users', users);

// // catch 404 and forward to error handler
// //捕获404并转发到错误处理程序
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// //错误处理程序
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   //设置当地人，只在开发中提供错误
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   //呈现错误页面
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
