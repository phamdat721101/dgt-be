const express = require('express');
const router =express.Router();
const userCtrl = require('../controllers/user.controller');

router.route('/user').get(userCtrl.profile)
router.route('/vault_balance').get(userCtrl.vault_balance)
router.route('/user_portfolio').get(userCtrl.user_portfolio)
router.route('/subscribe_signal').post(userCtrl.subscribe)
router.route('/vault_allocation').get(userCtrl.vault_allocation)
router.route('/user_history').get(userCtrl.user_history)
router.route('/deposit_event').get(userCtrl.sub_deposit_event)

module.exports = router