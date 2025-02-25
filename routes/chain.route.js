const express = require('express');
const router =express.Router();
const chainCtrl = require('../controllers/chain.controller');

router.route('/').get(chainCtrl.get_chain_data)

module.exports = router