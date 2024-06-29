const Contract = require('web3-eth-contract');
const vault = require('../services/vault');
const axios = require('axios')

exports.list_vault = async(req, res, next) =>{
    const vaults = await vault.list_vault()

    res.json(vaults)
}

exports.information = async (req, res, next) => {
    try {
        let vault_id = req.query.vault_id
        const vault_info = await vault.vault_detail(vault_id)
        res.json(vault_info);
    } catch (error) {
        console.log("Error to get user profile: ", error)
        next(error);
    }
};

exports.public_signal = async(req, res, next) =>{
    const public_signal = {
        "name":"FinX",
        "amount":2411,
        "type": "Holding",
        "timestamp":2424,
        "chain":"EVM"
    }

    res.json({
        code: 0,
        data: public_signal
    })
}

exports.members = async(req, res, next) =>{
    const members = [{
        "name":"PQD",
        "lp_amount":2411,
        "created_at":2024,
        "risk_guard":6
    }]

    res.json({
        code: 0, 
        data: members
    })
}

exports.signal_fee = async(req, res, next) =>{
    const signal_fee = {
        "amount":2411,
        "leverage":6,
        "start_at":24,
        "end_at":2411
    }

    res.json({
        code: 0,
        data: signal_fee
    })
}

exports.signal_provider = async(req,res, next) =>{
    const signal_provider = {
        "provider_adr": "0x123msdf",
        "amount":2411,
    }

    res.json({
        code: 0,
        data: signal_provider
    })
}

exports.vault_allocation = async(req, res, next)=>{
    let vault_req = {
        chain: req.query.chain, 
        pool: req.query.pool  
    }
    const vault_allocation = await vault.portfolio_structure(vault_req)
    console.log("Allocation: ", vault_allocation)

    res.json(vault_allocation)
}

exports.list_token = async(req, res, next) =>{
    let resp = await  axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
          'X-CMC_PRO_API_KEY': 'c7bdec82-4291-460b-b7f1-b3dfacffc5ca',
        },
    });

    let list_token = resp.data.data
    let tokens = []
    for(let i = 0; i < list_token.length; i++){
        let token_id = list_token[i].id
        let token_info = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id='+token_id, {
            headers: {
              'X-CMC_PRO_API_KEY': 'c7bdec82-4291-460b-b7f1-b3dfacffc5ca',
            },
        });
        // console.log("Token info: ", token_info.data)
        let token = {
            "id": list_token[i].id,
            "name": list_token[i].name,
            "symbol": list_token[i].symbol,
            "price": list_token[i].quote.USD.price,
            "logo_url":token_info.data.data[token_id].logo
        }
        tokens.push(token)
        if( i > 9){
            break
        }
    }

    res.json(tokens)
}

exports.create_vault = async(req, res, next) =>{
    let vault = {
        "manager": req.body.manager,
        "vault_symbol": req.body.vault_symbol,
        "symbols": req.body.symbols, //notice array
        "token_adrs": req.body.token_adrs, //notice array
        "created_at": req.body.created_at,
        "end_at": req.body.end_at,
        "manage_fee": req.body.manage_fee
    }

    let resp = {
        "status":"ok",
        "tx_hash":"0x29ad2c212d488faf556bd307be1aa5df0532d87399dd096545c71fd9992f4226",
        "contract": "0xa42b1378D1A84b153eB3e3838aE62870A67a40EA",
        "from": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    }

    res.json(resp)
}