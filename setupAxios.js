const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(createProxyMiddleware("/costcalc", {
        target: "https://wildfirenasa.herokuapp.com/api/cost",
        secure: false,
        changeOrigin: true
    }));
};