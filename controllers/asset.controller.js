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
            "name":"KEANU COIN",
            "symbol":"keanu",
            "contract":"AdTqNaPieJhNzNWNf1bTi7ffbmFty71TX7zeFxxvrFgg",
            "chain":"solana",
            "entry":"fibo_zon",
            "stop_loss":"59%",
            "profit":"120%",
            "link":"https://www.dextools.io/app/en/solana/pair-explorer/4AtL9cjyaMFnU7qopKaMWJJGQAmu5L3QZN9FBfX6aDko?t=1711243318693",
            "dex_protocol":"raydium",
            "total_cap":"477k",
            "created_at":"3/24/2024 03:42",
        }
    ]

    res.json(signal)
}