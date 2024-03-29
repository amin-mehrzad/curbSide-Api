const express = require('express');
const router = express.Router();
const scopeController = require('../api/controllers/scopesController');
var permissions = require('express-jwt-permissions')();

router.get('/', permissions.check([['users:read', 'scopes:read'], ['admin'],['user']]), scopeController.getAll);
router.get('/:userId', permissions.check([['users:read', 'scopes:read'], ['admin'],['user']]), scopeController.getByUserID);
router.put('/:userId', permissions.check([['users:read', 'scopes:read', 'scopes:write', 'users:write'], ['admin'],['user']]), scopeController.updateByUserID);

module.exports = router;