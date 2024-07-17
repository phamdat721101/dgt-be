const axios = require("axios")
const sui_monitor = require('../chains/monitor/sui_monitor')
const evm_adr = require('../chains/address/evm.address')
const apt_adr = require('../chains/address/apt.address')
const algo_adr = require('../chains/address/algo.address')

const { Wallet } = require('ethers')
const { now } = require("mongoose")
const wallet = Wallet.createRandom()
const vaults = require('../services/vault')
const { User } = require('../model/user')

exports.register = async(req, res, next) =>{
    const user = new User(req.body)
    console.log("PQD go there: ", user)

    if(!user || user == undefined){
        res.json({
            "Error":"DB connection error"
        })
        return 
    }

    let resp = user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            invesments: doc
        });
    })

    if(!resp || resp == undefined){
        resp = {
            "error":"cannot connect to database"
        }
    }

    res.json(resp)
}

exports.subscribe = async(req, res, next) =>{
    let user_info = {
        "chain": req.body.chain, 
        "wallet": req.body.wallet, 
    }
    let resp = await subscribe_signal(user_info)
    if(resp.length <= 0){
        return "Error subscrtiption"
    }
    res.json({
        "dgt_id": resp[0].objectId,
        "digest": resp[0].digest
    })
}
exports.vault_balance = async(req, res, next) =>{
    let vault_id = req.query.vault_id
    const vault_balance = [
        {
            "vault_id":"dgt_v1",
            "balance":24111306, 
            "staked": 20051998
        }
    ]

    res.json(vault_balance)
}

exports.profile = async (req, res, next) => {
    try {
        const user_email = req.query.email

        const user_resp = {
            "name":"Pnha2411",
            "wallet":"0x7D...E95",
            "adr_url":"https://app.dappflow.org/explorer/account/I5ZVS5JQFRG4SBQPEYPP4UDTEMSMHXY6RO5BQ3GNTDKTFQWV3S7JXMYPCI/transactions",
            "des":"It is the best capital for funding allocation",
            "holding_amount":100, 
            "twitter": "https://x.com/pqd_2411",
            "managed_amount":2411,
            "dgt_amount":100, 
            "logo_url":"https://drive.google.com/file/d/1PHKQkJsCCvxi1PWc1kDoCsCZgsMHMK0O/view?usp=sharing",
            "vaults": vaults.list_vault()
        }
        res.json(user_resp);
    } catch (error) {
        console.log("Error to get user profile: ", error)
        next(error);
    }
};

exports.user_portfolio = async(req, res, next)=>{
    const pool_adr = "0xbd85f61a1b755b6034c62f16938d6da7c85941705d9d10aa1843b809b0e35582"
    const chain = "sui"
    let signal_info = await axios.get(`https://api.dexscreener.com/latest/dex/pairs/${chain}/${pool_adr}`)
    // console.log("Signal info: ", signal_info.data.pairs)

    const portfolio = signal_info.data.pairs

    res.json(portfolio)
}

exports.user_history = async(req, res, next)=>{
    let adr = req.query.email
    console.log("User address: ", adr)
    const user_tracker = [
        {
            "date": "7/6/2024",
            "manager": "DigiTrust",
            "package_type": "Low-risk",
            "amount":100,
            "price":36,
            "expected_return": 27,
            "tx_hash": "0x123",
            "expire_date": "9/10/2024"
        }
    ]

    res.json(user_tracker)
}

exports.sub_deposit_event = async(req, res, next) =>{
    //making connection + 
    const event_resp = await sui_monitor.emit_investor_deposit()
    res.json(event_resp)
}

exports.get_evm_address = async(req, res, next) =>{
    let account_id = req.query.account_id
    let address_id = req.query.address_id

    let adr_resp = await evm_adr.generate(account_id, address_id)

    res.json(adr_resp)
}

exports.get_apt_address = async(req, res, next) =>{
    let account_id = req.query.account_id

    let adr_resp = await apt_adr.aptos_address(wallet.mnemonic.phrase, account_id)

    res.json(adr_resp)
}

exports.get_algo_address = async(req, res, next) =>{
    let account_id = req.query.account_id

    let adr_resp = await algo_adr.createAddress()

    res.json(adr_resp)
}