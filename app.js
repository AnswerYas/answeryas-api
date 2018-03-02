const express = require('express');
const app = express();
bodyParser = require('body-parser');
const Bear = require('./models/bear');

// 给app配置bodyParser中间件
// 通过如下配置再路由种处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

/**
 * 链接数据库
 */
const url = 'mongodb://127.0.0.1:27017/answeryas';
const mongoose = require('mongoose'); // 加载mongoose模块
mongoose.connect(url); // 连接数据库

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

router.route('/bears')
  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err) res.send(err);

      res.json(bears);
    });
  })
  // 创建一条bear (用 POST动词访问uri http://localhost:8080/api/bears)
  .post(function(req, res) {
    const bear = new Bear(); // 创建一个Bear model的实例
    bear.name = req.body.name; // 从request取出name参数的值然后设置bear的name字段

    // 保存bear，加入错误处理，即把错误作为响应返回
    bear.save(function(err) {
      if (err) res.send(err);
      res.json({message: 'Bear created!'});
    });
  });

router
  .route('/bears/:bear_id')

  // 根据id获取指定的bear (GET 请求 http://localhost:8080/api/bears/:bear_id)
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) res.send(err);
      res.json(bear);
    });
  })
  .put(function(req, res) {
    // 通过bear modle查询一条bear
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) res.send(err);

      bear.name = req.body.name; // update the bears info

      // 保存bear
      bear.save(function(err) {
        if (err) res.send(err);
        res.json({message: 'Bear updated!'});
      });
    });
  })
  .delete(function(req, res) {
    Bear.remove(
      {
        _id: req.params.bear_id,
      },
      function(err, bear) {
        if (err) res.send(err);

        res.json({message: 'Successfully deleted'});
      }
    );
  });    


app.use(router);

app.listen(port);
console.log('app running on ' + port);