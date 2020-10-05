const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(createProxyMiddleware("https://stark-brushlands-63325.herokuapp.com/api/cost", {
        target: "https://stark-brushlands-63325.herokuapp.com/api/cost",
        secure: false,
        changeOrigin: true
    }));
};