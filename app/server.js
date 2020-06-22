const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Users = require('./schema/users')
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(bodyParser.json())
app.use('/login',(req,res)=>{
  let {username,password} = req.body
  Users.findOne({
    username:username,
    password:password
  }).then(user=>{
    if(user){
      res.send({  //登录成功 返回0
        erro:0
      })
    }else {
      res.send({  //登录失败 返回1
        erro:1
      })
    }
  })
})

app.use('/register', (req, res) => {
  let { username, password } = req.body;
  Users.findOne({
    username
  }).then(user => {
    if (user) { //如果存在该用户 则不能注册 返回1
      res.send({
        error: 1
      })
      return
    }
    res.send({ //如果不存在该用户 则可以注册 返回0
      error: 0
    })
    new Users({ //将注册成功的数据保存到数据库
      username,
      password,
      age: ~~(Math.random() * 20 + 20) //随机年龄 20 -40
    }).save()
  })
});

app.use('/userlist',(req,res)=>{
  Users.find().then(users=>{
    res.send(users);
  })
});


mongoose.connect('mongodb://localhost:27018/vuex',{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
  if(err){
    console.log("数据库连接失败")
    return;
  }
  app.listen(3000,()=>{
    console.log('3000端口成功监听')
  })
  console.log("数据库连接成功")
})
