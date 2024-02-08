const express = require('express');
const router =express.Router();
const vaultCtrl = require('../controllers/vault.controller');

router.route('/vault').get(vaultCtrl.information)
router.route('/signal').get(vaultCtrl.public_signal)
router.route('/members').get(vaultCtrl.members)

module.exports = router