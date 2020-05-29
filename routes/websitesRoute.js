const express = require('express');
const router = express.Router();
const websiteController = require('../api/controllers/websitesController');
var permission = require('express-jwt-permissions')();

// router.get('/',  permission.check([['websites:read'],['admin']]), websiteController.getAll);
router.post('/', permission.check([['websites:read', 'websites:write'],['admin']]), websiteController.create);
// router.get('/:websiteId',  permission.check([['websites:read'],['admin']]), websiteController.getById);
router.get('/',  permission.check([['websites:read'],['admin']]), websiteController.getById);
// router.put('/:websiteId', permission.check([['websites:read', 'websites:write'],['admin']]), websiteController.updateById);
router.put('/', permission.check([['websites:read', 'websites:write'],['admin']]), websiteController.updateById);
router.delete('/:websiteId', permission.check([['websites:read', 'websites:write'],['admin']]), websiteController.deleteById);
module.exports = router;
