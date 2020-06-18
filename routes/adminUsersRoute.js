const express = require('express');
const router = express.Router();
const adminUsersController = require('../api/controllers/adminUsersController');
var permissions = require('express-jwt-permissions')();
router.put('/:userId', permissions.check([['users:read','users:write'],['admin'],['user']]) , adminUsersController.editUser);
router.get('/', permissions.check([['users:read'],['admin'],['user']]) , adminUsersController.usersList);
router.get('/info', permissions.check([['users:read'],['admin'],['user']]) , adminUsersController.user);

router.delete('/:userId', permissions.check( [['users:read', 'users:write'],['admin'],['user']]), adminUsersController.deleteUser);
router.post('/', permissions.check( [['users:read', 'users:write'],['admin'],['user']]), adminUsersController.create);

module.exports = router;