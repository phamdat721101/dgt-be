const Contract = require('web3-eth-contract');
const vault = require('../services/vault');
const axios = require('axios')
const { Profile } = require('../model/profile')

exports.list_vault = async(req, res, next) =>{
    const vaults = await vault.list_vault()

    res.json(vaults)
}

exports.information = async (req, res, next) => {
    try {
        let profile_id = req.query.profile_id
        const profile = await Profile.findOne({ profile_id: profile_id });
        res.json(profile);
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
    const profile_req = {
        profile_id: req.body.profile_id || "unique_profile_id_here",
        username: req.body.username || "user_username_here",
        management_fee: req.body.management_fee || "0.3",
        email: req.body.email || "user_email_here",
        bio: req.body.bio || "user_bio_here",
        profile_picture_url: req.body.profile_picture_url || "profile_picture_url_here",
        wallet_address: req.body.wallet_address || "wallet_address_here",
        asset_portfolio: req.body.asset_portfolio || [
          {
            asset_id: "asset_id_here",
            amount: 0,
            asset_type: "asset_type_here"
          }
          // Additional assets can be added in the same format
        ],
        transaction_history: req.body.transaction_history || [
          {
            transaction_id: "transaction_id_here",
            date: "transaction_date_here",
            transaction_type: "transaction_type_here",
            status: "transaction_status_here"
          }
          // Additional transactions can be added in the same format
        ],
        followers: req.body.followers || [
          {
            name: "follower_name_here"
          }
          // Additional followers can be added in the same format
        ],
        following: req.body.following || [
          {
            name: "following_name_here"
          }
          // Additional following can be added in the same format
        ],
        created_at: req.body.created_at || "timestamp_created_here",
        updated_at: req.body.updated_at || "timestamp_updated_here"
    };

    let profile = new Profile(profile_req)

    let resp = profile.save((err, doc) =>{
        if (err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            profile: doc
        });
    })

    // if(!resp || resp == undefined){
    //     resp = {
    //         "error":"DB connection error"
    //     }
    // }
    // console.log("Resp: ", resp)

    // res.json(resp)
}