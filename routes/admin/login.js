const express = require('express');
const router = express.Router();
const loginCtrl = require('../../controllers/admin/login/login');
router.post('/' , loginCtrl.login);
module.exports = router;