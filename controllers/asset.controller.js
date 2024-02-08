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