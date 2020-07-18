var express = require('express');
var controller = require('./users.controller');
var router = express.Router();
var authenticate = require('../../middleware/auth');
var preauth = require('../../middleware/preauth');

router.get('/',  controller.getAll);
router.get('/:id',   controller.getOne);
router.post('/invite', controller.invite);
router.post('/login', preauth, controller.login);
router.post('/',controller.create);
router.put('/:id',controller.update);
router.delete('/:id', controller.delete);
router.post('/emailVerification', controller.emailVerification);
router.post('/passwordResetCode', controller.passwordResetCode);
router.post('/passwordReset',  controller.passwordReset);

module.exports = router;
