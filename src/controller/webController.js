// Import thư viện cần thiết
const jwt = require('jsonwebtoken');

// Các Biến dùng cho mục đích ẩn hiện toast
let failLogin = false;

let getHome = (req, res) => {
    // Kiểm tra nếu chưa đăng nhập thì chuyển qua page /login
    if (req.session.isLogined) {
        res.render('home2', {token: req.cookies.token});

        // Reset toast của các Biến Toast về false
        addSuccess = false;
        editSuccess = false;
        delSuccess = false;
    } else res.redirect('/login');
}

let getLogin = (req, res) => {
    // Trường hợp cố tình vào viết /login
    if (req.session.isLogined) {
        res.redirect('/');
    } else {
        // Render giao diện login và tham số cho Toast nếu đăng nhập không đúng
        res.render('login', {
            failLogin: failLogin
        });

        // Reset value
        failLogin = false;
    }
}

let getActionOnLogin = (req, res) => {
    // Nếu sai hiện Toast và quay về Login
    if (req.body.user === process.env.USER && req.body.pass === process.env.PASSWORD) {
        // Tạo tham số để kiểm tra đăng nhập khi về trang home
        req.session.isLogined = true;

        // Authorization
        const token = jwt.sign({user: req.body.user, admin: false}, process.env.JWT_ACCESS_KEY, { expiresIn: "1d" });

        // Lưu vào cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure:false,
            path: "/",
            sameSite: "strict",
        });

        res.redirect('/');
    } else if(req.body.user === process.env.ADMIN && req.body.pass === process.env.PASSWORD) {
        // Tạo tham số để kiểm tra đăng nhập khi về trang home
        req.session.isLogined = true;

        // Authorization
        const token = jwt.sign({user: req.body.user, admin: true}, process.env.JWT_ACCESS_KEY, { expiresIn: "1d" });

        // Lưu vào cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure:false,
            path: "/",
            sameSite: "strict",
        });

        res.redirect('/');
    } else {
        failLogin = true;
        res.redirect(`/login`);
    }
    res.end();
}

let getLogOut = (req, res) => {
    // Xoá key session
    delete req.session.isLogined;
    res.clearCookie();
    res.redirect('/');
}

// Exports các module
module.exports = {
    getHome, getLogin, getActionOnLogin, getLogOut
}