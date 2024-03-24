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
            "symbol":"pepe_growth",
            "contract":"0x12",
            "chain":"solana",
            "entry":"0.123",
            "stop_loss":"59%",
            "profit":"60%",
            "link":"gfg",
            "total_cap":"13k",
            "created_at":"24/3 - 7h03",
        }
    ]

    res.json(signal)
}