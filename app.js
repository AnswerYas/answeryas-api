const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const passport = require('passport')
// const Strategy = require('passport-http-bearer').Strategy
const {database} = require('./config')
const port = process.env.PORT || 3000;

// 给app配置bodyParser中间件
// 通过如下配置再路由种处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize()) // 初始化passport模块
app.use(morgan('dev')) // 命令行显示程序日志
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * 链接数据库
 */
const mongoose = require('mongoose'); // 加载mongoose模块
mongoose.connect(database); // 连接数据库

/**
 * 注册路由
 */
const router = express.Router();
router.use(function(req, res, next) {
  // 打印
  console.log('Something is happening.');
  next(); // 在这里会将request交给下一个中间件，如果这个中间件后面没有其他中间件，请求会交给匹配的路由作处理
});

router.get('/', (req, res) => {
  res.json({product_name: 'answeryas-api'});
});

app.use('/member', require('./routers/member'))

app.listen(port);
console.log('app running on ' + port);