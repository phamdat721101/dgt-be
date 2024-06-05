exports.list_vault = async (data) =>{
    let vaults = [
        {
            "vault_id":"finX",
            "symbol":"aHYPE",
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
            "symbol":"BTCX",
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
            "symbol":"POLX",
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
    let structure = {
        "price": "1348$",
        "vault_id":"finX",
        "vault_name":"High risk",
        "holding_value":"368000$",
        "amount_raised":"45%",
        "package":"dgt_low_risk",
        "assets":[
            {
                "asset": "Stacks",
                "symbol": "STX",
                "contract": "0x138234234",
                "chain": "btc layer-2",
                "invest_amount":2411, 
                "weight":"18%", 
                "holding":"1348$",
                "price_change":{
                    "24h":"5.5",                
                },
                "dgt_score": 8,
                "status":true,
                "url":"stx"
            },
            {
                "asset": "Merlin stack",
                "symbol": "MRL",
                "contract": "0x138234234",
                "chain": "btc layer-2",
                "invest_amount":2411, 
                "weight":"8%", 
                "holding":"1348$",
                "price_change":{
                    "24h":"6.5",                
                },
                "dgt_score": 8,
                "status":true,
                "url":"uma"
            }
        ]
    }

    return structure
}

exports.vault_detail = async (data) =>{
    let vault_detail = [
        {
            "vault_id": "dgt1",
            "vault_name": "dgt_info_1",
            "manager": "dgt_manager",
            "logo":"http://localhost:3000/image/logo",
            "vault_desc": "",
            "vault_adr": "0x312ms824234",
            "return":24,
            "assets":["CETUS", "SUI", "SUILIEN"],
            "created_at":1231,
            "updated_at":12312,
            "tvl": 4907, 
            "volume": 15,
            "price": 241105,
            "currency":"$"
        }
    ]

    return vault_detail
}