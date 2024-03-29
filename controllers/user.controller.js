const {
	DEFAULT_ED25519_DERIVATION_PATH,
	Ed25519Keypair,
	JsonRpcProvider,
	RawSigner,
	devnetConnection,
	TransactionBlock,
    toB64,
    fromExportedKeypair,
    testnetConnection
} = require('@mysten/sui.js');
const provider = new JsonRpcProvider(testnetConnection);
const privkey = '0xbc59c0992aa183ca50134fb7734844f473f43428bddf6cc55c95bd87ede72ad2'
const privateKeyBytes = Uint8Array.from(Buffer.from(privkey.slice(2), "hex")); 

const keypair = fromExportedKeypair({
    schema: "ED25519",
    privateKey: toB64(privateKeyBytes)
});

const signer = new RawSigner(keypair, provider);
const PACKAGE_ID = '0x2f8a1bdc3977cc134bf7bac4699712009878c7bd8ef72d144325a5f032d1c8ef'
const TREASURY_ID = '0x5fa75f3cc2bae39c34310a13809c507e027933f4acf5b9e3c5129402d7af2bde'

async function subscribe_signal(data) {
    try {
        const tx = new TransactionBlock();
        await tx.moveCall({
            target: `${PACKAGE_ID}::dgt::mint`,
            arguments: [
                tx.object("0x270875b1dbe6ad01ae1bf1ce0bf3e1526bbe32e9c879765cb6fed3ea4109d748"),
                tx.pure("2411"),
                tx.pure(data.wallet)
            ],
        });

        const transaction = await signer.signAndExecuteTransactionBlock({
            transactionBlock: tx,
            options: {
                showInput: true,
                showEffects: true,
                showEvents: true,
                showObjectChanges: true,
            }
        });

        console.log("DGT resp: ", transaction);
        return transaction.transaction.data.transaction.inputs
    } catch (error) {
        console.log(error);
    }
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
        const user_id = req.query.user_id
        const user_resp = {
            "name":"DigiTrust",
            "wallet":"0x13123",
            "des":"it is the best capital for funding allocation",
            "holding_amount":2411, 
            "managed_amount":2411,
            "dgt_amount":15000, 
            "logo_url":"http://localhost/pqd_user",
            "vaults":[
                {
                    "name":"dgt_internal",
                    "balance":2411, 
                    "list_price":"1306",
                    "current_price":"30.21",
                    "manager":"pqd capital",
                    "tvl":24111306,
                    "monthly_return":"24.11",
                    "daily_return":"2.4",
                    "logo_url":"http://localhost/dgt_internal"
                },
                {
                    "name":"cetus_internal",
                    "balance":2411, 
                    "list_price":"1306",
                    "current_price":"30.21",
                    "manager":"cetus capital",
                    "tvl":24111306,
                    "monthly_return":"24.11",
                    "daily_return":"2.4",
                    "logo_url":"http://localhost/dgt_internal"
                },
                {
                    "name":"cetus_internal",
                    "balance":2411, 
                    "list_price":"1306",
                    "current_price":"30.21",
                    "manager":"cetus capital",
                    "tvl":24111306,
                    "monthly_return":"24.11",
                    "daily_return":"2.4",
                    "logo_url":"http://localhost/dgt_internal"
                },
                {
                    "name":"aleo_internal",
                    "balance":2411, 
                    "list_price":"1306",
                    "current_price":"30.21",
                    "manager":"aleo capital",
                    "tvl":24111306,
                    "monthly_return":"24.11",
                    "daily_return":"2.4",
                    "logo_url":"http://localhost/dgt_internal"
                }
            ]
        }
        res.json(user_resp);
    } catch (error) {
        console.log("Error to get user profile: ", error)
        next(error);
    }
};

exports.user_portfolio = async(req, res, next)=>{
    const portfolio = {
        "user_adr": "0x6123m",
        "total_portfolio_value": 2411,
        "roi": 24,
        "risk_metrics": 8,
        "risk_guard":6
    }

    res.json({
        code: 0,
        data: portfolio
    })
}

exports.user_history = async(req, res, next)=>{
    const user_history = [
        {
            "date": "0x6123m",
            "name": "dgt_rwa_bucket",
            "type": "hedge",
            "invest_amount":2411, 
            "profit":"18%", 
            "daily_loss":"1%",
            "total_loss":"5%",
            "dgt_score": 8,
            "status":true
        }
    ]

    res.json(user_history)
}