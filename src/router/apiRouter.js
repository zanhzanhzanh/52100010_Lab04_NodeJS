// Import file và các thư viện
const getAllModule = require('../controller/apiController');
const getAuth = require('../controller/middlewareController')
const express = require('express');
let router = express.Router();

const getApiRouter = (app, upload) => {
    // GET All User
    router.get('/', getAllModule.getAllUsers);

    // GET Specific User
    router.get('/:id(\\d+)', getAuth.verifyTokenAndAdmin, getAllModule.getOneUser);

    // CREATE New User
    router.post('/', getAuth.verifyTokenAndAdmin, upload.single('image'), getAllModule.createUser);

    // UPDATE User
    router.put('/:id(\\d+)', getAuth.verifyTokenAndAdmin, upload.single('image'), getAllModule.updateUser);

    // DELETE User
    router.delete('/:id(\\d+)', getAuth.verifyTokenAndAdmin, getAllModule.deleteUser);

    // Sử dụng tiền tố cho Router
    return app.use('/public-api/users', router);
}

// Export all Router
module.exports = getApiRouter;