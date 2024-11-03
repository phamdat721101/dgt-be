const express = require('express');
const router =express.Router();
const tokenCtrl = require('../controllers/token.controller');

/*---Token Balance--*/
// router.route('/user_balance').get(tokenCtrl.user_balance)
// router.route('/claim_token').post(tokenCtrl.claim_token)
router.route('/price').get(tokenCtrl.get_xau_price)

module.exports = router