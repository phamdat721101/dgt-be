const axios = require('axios');
const Web3 = require('web3');
const Contract = require('web3-eth-contract');
const {dgtCfg, vaultParams} = require('../config/vars')
const vault_abi = require('../config/abi/dgt_vault.json')
const {provider} = require('../utils/provider')

exports.contractProvider = require('web3-eth-contract');
const web3 = new Web3(dgtCfg.providerUrl)

Contract.setProvider(provider)

exports.get_vault_return = async (data) =>{
    let contract = new Contract(vault_abi, vaultParams.dgtVaultAddres)
    try {
        let receipt = await contract.methods.get_return(1).call()
        console.log("Return info: ", receipt)
        return receipt
    } catch (err) {
        console.log("Error get asset: ", err.message)
        return err.message
    }
}


exports.list_vault = async (data) =>{
    let vaults = [
        {
            "vault_id":"finX",
            "symbol":"N-DGT",
            "asset":[
                "https://dd.dexscreener.com/ds-data/tokens/sui/0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::fud.png"
            ],
            "vault_name":"Native vault",
            "price":"1500$",
            "return":24,
            "tvl":2411942139,
            "monthly_return":"24.32%",
            "daily_return":"1.8%",
            "manager":"Dgt invest",
            "des":"DigiTrust ecosystem",
            "timestamp":2424,
            "chain":"EVM",
            "url":"https://dd.dexscreener.com/ds-data/tokens/sui/0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::fud.png"
        },
        {
            "url":"https://xkqpczltzicnmbqvihbc.supabase.co/storage/v1/object/public/logos/okb_887.png",
            "vault_id":"btcX",
            "vault_name":"Meme vault",
            "symbol":"M-DGT",
            "price":"67000$",
            "return":24,
            "tvl":24123411,
            "monthly_return":"18%",
            "daily_return":"1.8%",
            "manager":"Dgt invest",
            "des":"DigiTrust ecosystem",
            "timestamp":2424,
            "chain":"EVM",
            // "url":"https://dd.dexscreener.com/ds-data/tokens/sui/0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::fud.png"
        },
        {
            "url":"https://xkqpczltzicnmbqvihbc.supabase.co/storage/v1/object/public/logos/ton_7768.png",
            "vault_id":"polX",
            "vault_name":"High risk",
            "symbol":"H-DGT",
            "price":"540$",
            "return":24,
            "tvl":2349310411,
            "monthly_return":"9.36%",
            "daily_return":"1.8%",
            "manager":"Dgt invest",
            "des":"DigiTrust ecosystem",
            "timestamp":2424,
            "chain":"EVM",
            // "url":"https://dd.dexscreener.com/ds-data/tokens/sui/0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::fud.png"
        }
    ]

    return vaults
}

exports.portfolio_structure = async (data) =>{
    let url = 'https://api.dexscreener.com/latest/dex/pairs'
    let chain = data.chain || 'ton'
    let pool = data.pool || 'EQBCwe_IObXA4Mt3RbcHil2s4-v4YQS3wUDt1-DvZOceeMGO'
    let asset_info = await axios.get(`${url}/${chain}/${pool}`)

    console.log("Asset info: ", asset_info)

    let structure = {
        "price": "1348$",
        "vault_id":"finX",
        "vault_name":"High risk",
        "vault_type":1,
        "holding_value":"368000$",
        "amount_raised":"45%",
        "package":"dgt_low_risk",
        "assets":[
            {
                "asset": "NOT coin",
                "symbol": "NOT",
                "contract": "0x138234234",
                "chain": "btc layer-2",
                "invest_amount":10, 
                "weight":"18%", 
                "holding":"1348$",
                "price_change":{
                    "24h":"5.5",                
                },
                "dgt_score": 8,
                "status":true,
                "logo_url":"https://dd.dexscreener.com/ds-data/tokens/ton/eqavlwfdxgf2lxm67y4yzc17wykd9a0guwpkms1gosm__not.png"
            },
            {
                "asset": "Resistance DOG",
                "symbol": "REDO",
                "contract": "0x138234234",
                "chain": "btc layer-2",
                "invest_amount":90, 
                "weight":"8%", 
                "holding":"1348$",
                "price_change":{
                    "24h":"6.5",                
                },
                "dgt_score": 8,
                "status":true,
                "logo_url":"https://dd.dexscreener.com/ds-data/tokens/ton/eqbz_cafpydr5kuts0anxh0ztdhkpezonmlja2sngllm4cko.png"
            }
        ]
    }

    return structure
}

exports.vault_detail = async (data) =>{
    let vault_return = await this.get_vault_return()

    let vault_detail = [
        {
            "vault_id": "dgt1",
            "vault_name": "dgt_info_1",
            "manager": "dgt_manager",
            "logo":"http://localhost:3000/image/logo",
            "vault_desc": "",
            "vault_adr": "0x312ms824234",
            "return":vault_return,
            "assets":["CETUS", "SUI", "SUILIEN"],
            "created_at":1231,
            "updated_at":12312,
            "tvl": 4907, 
            "volume": 15,
            "price": 241105,
            "currency":"$"
        }
    ]

    // if(data.)

    return vault_detail
}