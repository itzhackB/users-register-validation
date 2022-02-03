const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/users', userController.get_all_users);

router.post('/create', userController.create_user);

router.delete('/:id', userController.delete_user);


module.exports = router;