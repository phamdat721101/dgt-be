const express = require('express');
const router =express.Router();
const vaultCtrl = require('../controllers/vault.controller');

router.route('/vaults').get(vaultCtrl.list_vault)
router.route('/vault_detail').get(vaultCtrl.information)
router.route('/vault_signal').get(vaultCtrl.public_signal)
router.route('/vault_allocation').get(vaultCtrl.vault_allocation)
router.route('/members').get(vaultCtrl.members)

router.route('/list_token').get(vaultCtrl.list_token)
router.route('/create_vault').post(vaultCtrl.create_vault)

module.exports = router