const Web3 = require('web3');
const Contract = require('web3-eth-contract');
const tokenAbi = require('../config/abi/dgt.json')
exports.contractProvider = require('web3-eth-contract');

const {dgtCfg, tokenParams} = require('../config/vars')
// const {getNonce} = require('./priceFeed_service')

const {provider} = require('../utils/provider')
const web3 = new Web3(dgtCfg.providerUrl)

Contract.setProvider(provider)
const contract = new this.contractProvider(tokenAbi, tokenParams.tokenAddress)

exports.mint_token = async(req) =>{
    try {
        let to_adr = '0x0D0Df554db5623Ba9A905D0bE4C6bAc48144841E'
        let amount =  2411
        let user = req.sender
        let contract_params = {
            from: '0x90de83fd2cd4d01660cd6909692568a14661cdf1',
            gasPrice: 25000000000,
            gasLimit: 8500000,
        }
        let receipt = await contract.methods.vault_transfer(to_adr, amount, user).send(Object.assign(contract_params));
        console.log("Transaction receipt: ", receipt)
        return receipt
    } catch (err) {
        return err.message
    }
}

exports.getTokenSupply = async(req) =>{
    let contract = new Contract(tokenAbi, req.assetAddress)
    let nonce = await getNonce(dgtCfg.contractOwnerAddr)
    try {
        let receipt = await contract.methods.getChallengeInfo().call()
        console.log("Asset info: ", receipt)
        return receipt
    } catch (err) {
        console.log("Error get asset: ", err.message)
        return err.message
    }
}

exports.user_balance = async(req,res, next) =>{
    let email = req.query.email 

    if(email.length == 0){
        email = "dgt@gmail.com"
    }

    let receipt = await contract.methods.get_user_balance(email).call();
    console.log("Transaction receipt: ", )

    const user_balance = {
        "user_email": email,
        "amount":receipt,
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