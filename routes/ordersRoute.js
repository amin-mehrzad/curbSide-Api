const express = require('express');
const router = express.Router();
const orderController = require('../api/controllers/ordersController');
var permission = require('express-jwt-permissions')();


router.get('/',  permission.check([['orders:read'],['admin'],['user']]), orderController.getAll);
router.post('/', permission.check([['orders:read', 'orders:write'],['admin'],['user']]), orderController.create);
router.get('/:orderId',  permission.check([['orders:read'],['admin'],['user']]), orderController.getById);
router.put('/:orderId', permission.check([['orders:read', 'orders:write'],['admin'],['user']]), orderController.updateById);
router.delete('/:orderId', permission.check([['orders:read', 'orders:write'],['admin'],['user']]), orderController.deleteById);
module.exports = router;