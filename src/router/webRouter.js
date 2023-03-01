// Import file và các thư viện
const getAuth = require('../controller/middlewareController')
const getAllModule = require('../controller/webController');
const express = require('express');
let router = express.Router();

const getWebRouter = (app, upload) => {
    // Trang home
    router.get('/', getAllModule.getHome);

    // Trang login
    router.get('/login', getAllModule.getLogin);

    // Check thông tin đăng nhập
    router.post('/action', getAllModule.getActionOnLogin);

    // Đăng xuất hệ thống
    router.get('/logout', getAllModule.getLogOut);

    // Chỉ nhận endpoint là giá trị nguyên
    router.get('/:id(\\d+)', (req, res) => {
        // Render ra trang detail
        res.render('detail', {token: req.cookies.token});
    });

    // Render ra trang form khi nhận được endpoint là add
    router.get('/add', (req, res) => {
        res.render('form', {token: req.cookies.token});
    })

    // Sử dụng tiền tố cho Router
    return app.use('/', router);
}

// Export all Router
module.exports = getWebRouter;