const express = require('express');
const router =express.Router();
const userCtrl = require('../controllers/user.controller');

router.route('/user').get(userCtrl.profile)
router.route('/user_portfolio').get(userCtrl.user_portfolio)

module.exports = router