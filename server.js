var path = require('path')
var express = require('express');
var proxy = require('http-proxy-middleware')

var app = express();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});

app.use('/api', proxy({target: 'https://m.hao24.com', changeOrigin: true, pathRewrite: {
  '^/api': ''
}}));


app.use(express.static(path.join(__dirname, "/")));
app.listen(8080, function(){
        console.log('Server running on http://localhost:8080');
})