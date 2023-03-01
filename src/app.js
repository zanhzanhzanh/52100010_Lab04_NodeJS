// Import các file khác
const getWebRouter = require('./router/webRouter');
const getApiRouter = require('./router/apiRouter');
const configServer = require('./configs/configServer');
// Import thư viện
const express = require('express');
const app =  express();

// PORT
const PORT = process.env.PORT || 3000;

// Moudle cấu hình
const upload = configServer(app, __dirname);

// Lấy All Web Router
getWebRouter(app, upload);

// Lấy All API Router
getApiRouter(app, upload);

// Listen PORT
app.listen(PORT, () => {
    console.log('Listen on PORT: ' + PORT);
})