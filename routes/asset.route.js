const express = require('express');
const router =express.Router();
const assetCtrl = require('../controllers/asset.controller');

router.route('/asset').get(assetCtrl.asset)

module.exports = router