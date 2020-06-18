const express = require('express');
const router = express.Router();
const userController = require('../api/controllers/usersController');
var permissions = require('express-jwt-permissions')();
router.put('/', permissions.check([['users:read','users:write'],['admin'],['user']]) , userController.editUser);
router.get('/', permissions.check([['users:read'],['admin'],['user']]) , userController.user);
router.get('/list', permissions.check( [['users:read'],['admin'],['user']]) , userController.user);
router.delete('/:userId', permissions.check( [['users:read', 'users:write'],['admin'],['user']]), userController.deleteUser);

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.post('/refreshToken', userController.refreshToken);
module.exports = router;