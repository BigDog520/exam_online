var express = require("express")
var router = require("./router.js")
var app = express()
//导入session模块
var session = require('express-session')
//配置
app.use(session({
  secret: 'keyboard cat',  //配置加密字符串
  resave: false,
  saveUninitialized: true  //无论你是否使用session 都给你分配钥匙
}))

app.use(router)

app.listen(3000, function () {
  console.log("app is running")
})
