const Contract = require('web3-eth-contract');
// const {dgtCfg, contractParams} = require('../config/vars')
// const {getNonce} = require('./priceFeed_service')

// const tokenAbi = require("../abi/tokenAbi.json");
// const {provider} = require('../utils/provider')

// Contract.setProvider(provider)

exports.user_balance = async(req,res, next) =>{
    let email = req.query.email 

    if(email.length == 0){
        email = "dgt@gmail.com"
    }

    const user_balance = {
        "user_email": email,
        "amount":2411,
    }

    res.json(user_balance)
}

exports.claim_token = async(req, res, next) =>{
    let user_req = {
        "receiver":req.body.receiver, 
        "amount":1000, 
        "created_at":req.body.created_at,
        "email":req.body.email
    }

    let resp = {
        "amount":1000,
        "status": 200
    }

    res.json(resp)
}