const express = require('express');
const router =express.Router();
const tokenCtrl = require('../controllers/token.controller');

router.route('/price').get(tokenCtrl.get_xau_price)
router.route('/txs').get(tokenCtrl.get_tx_by_addr)
router.route('/stake_tx').get(tokenCtrl.get_stake_tx)

module.exports = router