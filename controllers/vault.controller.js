exports.list_vault = async(req, res, next) =>{
    const vaults = [
        {
            "vault_id":"finX",
            "vault_name":"FinX",
            "return":24,
            "tvl":2411,
            "monthly_return":"24.32%",
            "daily_return":"1.8%",
            "manager":"Dgt invest",
            "des":"DigiTrust ecosystem",
            "timestamp":2424,
            "chain":"EVM"
        },
        {
            "vault_id":"btcX",
            "vault_name":"BTCX",
            "return":24,
            "tvl":2411,
            "monthly_return":"24.32%",
            "daily_return":"1.8%",
            "manager":"Dgt invest",
            "des":"DigiTrust ecosystem",
            "timestamp":2424,
            "chain":"EVM"
        },
        {
            "vault_id":"polX",
            "vault_name":"PolygonX",
            "return":24,
            "tvl":2411,
            "monthly_return":"24.32%",
            "daily_return":"1.8%",
            "manager":"Dgt invest",
            "des":"DigiTrust ecosystem",
            "timestamp":2424,
            "chain":"EVM"
        },
        {
            "vault_id":"arbX",
            "vault_name":"ArbitrumX",
            "return":24,
            "tvl":2411,
            "monthly_return":"24.32%",
            "daily_return":"1.8%",
            "manager":"Dgt invest",
            "des":"DigiTrust ecosystem",
            "timestamp":2424,
            "chain":"EVM"
        }
    ]

    res.json(vaults)
}

exports.information = async (req, res, next) => {
    try {
        let vault_id = req.query.vault_id
        console.log("Vault id: ", vault_id)
        const vault_info = [
            {
                "vault_id": "dgt1",
                "vault_name": "dgt_info_1",
                "manager": "dgt_manager",
                "logo":"http://localhost:3000/image/logo",
                "vault_desc": "making profit",
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