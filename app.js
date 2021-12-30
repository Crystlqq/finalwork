// 服务器模块
const express = require("express");
const app = express();
var session = require('express-session')
const mongoose = require("mongoose"); //加载数据库模块
var bodyParser = require("body-parser"); //加载body-parser处理post提交的数据
const path = require("path");
var model = require("./models/users"); //使用models下的users集合
app.use(express.static("public/images"))//读取相对路径这样就可以访问图片


app.use(session({//session配置
  secret:'qf project',
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:1000*60*5}//制定登录会话有效时长
}))




// cp = require("child_process"); // 可自动打开浏览器模块

app.use(require("cors")()); //解决拦截跨源请求问题

// 引入模板引擎，设置模板引擎加载资源的后缀名
app.use(express.static(path.join(__dirname, "public"))); //将静态资源放在public目录
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views")); //将前端页面放在views目录
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

// 导入外置路由
var router = require("./routes/router");
// 引用外置路由
app.use(router);



//登录接口
app.post('/login',function(req,res,next){
  var data = {
      username: req.body.username,
      password: req.body.password
  }
  console.log(data)
  model.find(data, (err, doc) => {
    console.log(doc)
    if(err) return console.log(err);
    if(doc.length > 0) {
      //登录成功，进行session会话存储
      req.session.username = data.username
      res.redirect('/index')
    }
    else {
      res.redirect('/login')
    }
  })
  //console.log('用户登录',data)
  //res.render('index.html')
})


//注册接口
app.post('/regist',function(req,res,next){
    var data  = {
      username:req.body.username,
      psssword:req.body.password
  }
  console.log(data)
  var user = new model({
    username: req.body.username,
    password: req.body.password
  })
  user.save((err) => {
    if(err) return console.log(err)
    console.log("插入成功")
    app.redirect("/login")
})
})

app.get('/login',function(req,res){
  res.render('login.html')
})
app.get('/regist',function(req,res){
  res.render('regist.html')
})
app.get('/index',function(req,res){
  res.render('index.html')
})

// app.post('/users/regist',function(req,res){
//   res.render('login.html')
// })





app.listen(3000, function () {
  console.log("启动成功，可以访问：http://localhost:3000/");
  
});
