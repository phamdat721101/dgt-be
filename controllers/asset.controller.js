exports.asset = async (req, res, next) => {
    try {
        const asset = {
            "asset_id":"dgt_1",
            "name":"meme coin",
            "symbol":"dgt_ass_1",
            "decimal":2411,
            "price":24111998,
            "owner":"pqd_dgt_adr"
        }
        res.json({
            code: 0,
            data: asset
        });
    } catch (error) {
        console.log("Error to get user profile: ", error)
        next(error);
    }
};

exports.sub_signal = async(req, res, next) =>{
    const signal = [
        {
            "name":"Squirtle",
            "symbol":"SQR",
            "contract":"CGpH5EYwSByWnFSyzKMnbPWUYcAu2bCRKDvHDWs4uBBs",
            "chain":"solana",
            "entry":"0.00006853",
            "stop_loss":"97%",
            "profit":"190%",
            "link":"https://www.dextools.io/app/en/solana/pair-explorer/BashvT8fjJVNAcY5dp8ZsiFHU3BG22ey1X4VwY75hMza?t=1711332564435",
            "dex_protocol":"raydium",
            "total_cap":"35.98k",
            "created_at":"3/25/2024 04:27",
        }
    ]

    res.json(signal)
}