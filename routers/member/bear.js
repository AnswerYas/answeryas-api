const router = require('express').Router()
const Bear = require('../../models/member/bear')

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

module.exports = router