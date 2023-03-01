// Import thư viện cần thiết
const fs = require('fs');

// Data
let users = [
    { id: 1, name: 'Alex Standred', gender: 'Male', email: 'alex@gmail.com', img: 'img/xs.jpg', status: 'Active'},
    { id: 2, name: 'Lucy Kyama', gender: 'Female', email: 'lucy@gmail.com', img: 'img/tt.jpg', status: 'Active'},
    { id: 3, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/mac.jpg', status: 'Active'},
    { id: 4, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/4.jpg', status: 'Active'},
    { id: 5, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/5.jpg', status: 'Active'},
    { id: 6, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/6.jpg', status: 'Active'},
    { id: 7, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/7.jpg', status: 'Active'},
    { id: 8, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/8.jpg', status: 'Active'},
    { id: 9, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/9.jpg', status: 'Active'},
    { id: 10, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/10.jpg', status: 'Active'},
    { id: 11, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/11.jpg', status: 'Active'},
    { id: 12, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/12.jpg', status: 'Active'},
    { id: 13, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/13.jpg', status: 'Active'},
    { id: 14, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/14.jpg', status: 'Active'},
    { id: 15, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/15.jpg', status: 'Active'},
    { id: 16, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/16.jpg', status: 'Active'},
    { id: 17, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/17.jpg', status: 'Active'},
    { id: 18, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/18.jpg', status: 'Active'},
    { id: 19, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/20.jpg', status: 'Active'},
    { id: 20, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/21.jpg', status: 'Active'},
    { id: 21, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/22.jpg', status: 'Active'},
    { id: 22, name: 'Kevin Monola', gender: 'Male', email: 'kevin@gmail.com', img: 'img/19.jpg', status: 'Active'}
]

let getAllUsers = (req, res) => {
    let page = req.query.page ? parseInt(req.query.page) : 0;
    page = page === 1 ? 0 : page;

    // Filter
    let user = users.filter((item, index) => {
        return index >= 10*page && index < 10*page + 20;
    })

    res.status(200).json({
        data: user,
    });
}

let getPage = (req, res) => {
    const { page } = parseInt(req.params);

    // Filter
    let user = users.filter((item, index) => {
        return index >= 10*page && index < 20*2;
    })

    res.status(200).json({
        data: user,
    });
}

let getOneUser = (req, res) => {
    // Convert thành số nguyên
    const id = parseInt(req.params.id);

    // Tìm kiếm theo id
    let user = users.find((item) => {
        return item.id === id;
    })

    // Mess 200
    res.status(200).json({
        data: user,
    });
}

let createUser = (req, res) => {
    // New Obj
    let newObj = req.body;

    // Xử lý id user mới
    newObj.id = users.length < 1 ? 1 : users[users.length - 1].id + 1;

    if(req.file) {
        // Thêm trường img cho obj
        newObj['img'] = req.file.path.split("public\\")[1];

        // Thêm vào users
        users.push(newObj);

        // Mess 200
        res.status(200).json({
            message: 'Success',
        });
    } else {
        // Mess 403 nếu file không hợp lệ
        res.status(403).json({
            message: 'Only accept .jpeg or .png',
        });
    }
}

let updateUser = (req, res) => {
    // Chuyển id về int
    const id = parseInt(req.params.id);

    // Tìm kiếm id phù hợp (không xét case ko tìm thấy vì trang home đã loại trừ bởi giao diện)
    let user = users.find((item) => {
        return item.id === id;
    })

    if(Object.keys(req.body).length != 0) {
        // Thay thế thông số
        user.name = req.body.name;
        user.gender = req.body.gender;
        user.email = req.body.email;
        // user.status = req.body.status;
    }

    // Nếu tồn tại ảnh thay thế
    if(req.file) {
        // Xoá ảnh cũ
        fs.unlink('./src/public/' + user.img, (err) => {
            if (err) throw err;
        });

        // Gán ảnh mới
        user.img = req.file.path.split("public\\")[1];
    }

    // Mess 200
    res.status(200).json({
        message: 'Success',
    });
}

let deleteUser = (req, res) => {
    // Xoá object
    users = users.filter((obj) => obj.id != req.params.id);

    // Xoá ảnh cũ
    fs.unlink('./src/public/' + req.body.img, (err) => {
        if (err) throw err;
    });

    // Mess 200
    res.status(200).json({
        message: 'Success',
    });
}

// Exports các module
module.exports = {
    getAllUsers, getOneUser, createUser, updateUser, deleteUser, getPage
}