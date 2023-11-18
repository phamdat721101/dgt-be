const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const axios = require('axios');
const { appendFile } = require('fs');

// const fetch = require('node-fetch');

// async function getData() {
//     const url = 'http://localhost:4001/v1/status';
//     const response = await fetch(url);
//     const jsonResponse = await response.json();
//     console.log("PQD: ", jsonResponse);
// } 
  
// getData();

// app.use(express.static('public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*'
}));

app.get('/', async (req, res) => {
    let resp = await axios.get('http://109.123.233.65:4001/v1/asset?assetAddress=0x23926749Faf9F9AB807e57010999e9f274390421')

    console.log("resp after: ", resp.data.data)
    res.json({
        code: 0,
        data: resp.data.data
    })
})

app.get('/asset/detail', async(req, res) =>{
    let assetAdr = req.query.assetAdr
    res.json({
        code: 0,
        data: {
            "owner":"0x59bC75a49B08088C1866fc2fF8E9776C9585ee5F",
            "tokenId": 1306,
            "assetId":"DGT",
            "amount":1200,
            "image":"link",
            "information":"get information from herer"
        }
    })
})

app.get('/assets', async (req, res) => {
    // let request = req.query.assetAddress
    // let resp = await axios.get(`http://109.123.233.65:4001/v1/asset?assetAddress=${request}`)

    res.json({
        status: 200,
        data: [
            {
                "owner":"0x59bC75a49B08088C1866fc2fF8E9776C9585ee5F",
                "assetId":"DGT",
                "tokenId": 12,
                "image":"link",
                "information":"get information from herer"
            },
            {
                "owner":"0x59bC75a49B08088C1866fc2fF8E9776C9585ee5F",
                "assetId":"HOC",
                "tokenId": 15,
                "image":"link",
                "information":"get information from herer"
            },
            {
                "owner":"0x59bC75a49B08088C1866fc2fF8E9776C9585ee5F",
                "assetId":"PQD",
                "tokenId": 18,
                "image":"link",
                "information":"get information from herer"
            }
        ]
    })
})

app.get('/v1/asset', async (req, res) => {
    let request = req.query.assetAddress
    let resp = await axios.get(`http://109.123.233.65:4001/v1/asset?assetAddress=${request}`)

    res.json({
        code: 0,
        data: resp.data.data
    })
})

app.get('/v1/invest', async (req, res) => {
    let request = req.query.orderAdr
    console.log("Req: ", request)
    let resp = await axios.get(`http://109.123.233.65:4001/v1/order?orderAdr=${request}`)

    res.json({
        code: 0,
        data: resp.data.data
    })
})

app.post('/v1/create_invest', async (req, res) =>{
    let resp = await axios.post("http://109.123.233.65:4001/v1/order/createOrder", {
        assetAddress: req.body.assetAddress,
        symbol: req.body.symbol,
        startPrice: req.body.startPrice,
        endPrice:req.body.endPrice,
        openAt: req.body.openAt,
        closeAt: req.body.closeAt,
        amount: req.body.amount,
        duration: req.body.duration,
        owner: req.body.owner
    })
    
    res.json({
        code: 0,
        data: resp.data
    })
})

app.post('/v1/set_price', async (req, res) =>{
    let resp = await axios.post("http://109.123.233.65:4001/v1/order/setPriceOrder", {
        price: req.body.price,
        symbol: req.body.symbol,
        orderContractAddress: req.body.orderContractAddress
    })

    res.json({
        code:0,
        data: resp.data
    })
})

app.post('/v1/confirm_result', async (req, res) =>{
    let resp = await axios.post("http://109.123.233.65:4001/v1/order/confirmResult", {
        symbol: req.body.symbol,
        price: req.body.price,
        orderContractAddress: req.body.orderContractAddress
    })

    res.json({
        code: 0,
        data: resp.data
    })
})

app.post('/v1/withdraw', async (req, res) =>{
    console.log("PQD claim profit")
    let resp = await axios.post("http://109.123.233.65:4001/v1/order/claimProfit", {
        orderAdr: req.body.orderAdr,
        receiver: req.body.receiver
    })

    res.json({
        code: 0,
        data: resp.data
    })
})

app.post('/v1/invest', async (req, res) => {
    let request = {
        assetAdr: req.body.assetAdr,
        investor: req.body.investor,
        amount: req.body.amount,
        data: req.body.data
    }

    res.json({
        code: 0,
        data: "invest success"
    })
})

/*
 get sui transaction history
*/
const get_digest = async(user) =>{
    let resp = await axios.post("https://explorer-rpc.devnet.sui.io/", {
        "jsonrpc":"2.0",
        "id": "19",
        "method":"suix_queryTransactionBlocks",
        "params":[
            {
                "filter":{
                    "ToAddress":user
                },
                "options":{"showEffects":true,"showInput":true}
            },
                null,100,true
            ]
    })
    
    // return response
    return resp.data
}

const history = async (digest) => {
    // fetch from sui network
    let resp = await axios.post("https://explorer-rpc.devnet.sui.io/", {
        "jsonrpc":"2.0",
        "id":1,
        "method":"sui_getEvents",
        "params":[
            digest
            // {
            //     "Sender":"0x20cc2eb9d2559127da7c3eebd70169d5c95ff7eda490498951d32a3c53c50622"
            // },
            // {
            //     "txDigest":"6xKtWLEizBRy3hoJQZkRWu95H8iJKvakn47MbEQ2hMGJ",
            //     "eventSeq": "0"
            // },
            // 100,
            // false
            // {
            //     "filter":{
            //         "ToAddress":"0x20cc2eb9d2559127da7c3eebd70169d5c95ff7eda490498951d32a3c53c50622",
            //         "Package": "0x7e3cee9f0eb68d0aca0f590411b172593690d6f40c1ef0ca64da9194508d4291"
            //     },
            //     "options":{"showEffects":true,"showInput":true}
            // },
                // null,100,true
            ]
    })
    
    // return response
    return resp.data
};

app.get('/v1/history', async (req, res) =>{
    let user_id = req.query.wallet
    let digest = await get_digest(user_id)
    let transactions = digest.result.data
    let resp = []

    for(let i = 0; i < transactions.length; i++){
        let txInfo = await history(transactions[i].digest)
        console.log("Tx info: ", txInfo)
        if(txInfo.result.length == 0){
            continue
        }

        // console.log("Timestamp: ", transactions[i])
        txInfo.result[0].timestamp = transactions[i].timestampMs

        resp.push(txInfo.result[0])
    }

    // let resp = await history("6xKtWLEizBRy3hoJQZkRWu95H8iJKvakn47MbEQ2hMGJ")
    console.log("History resp: ", resp)
    let res_history = []
    for(let i = 0; i < resp.length; i++){
        let type = resp[i].type
        type = type.split("::")
        type = type[2] ? type[2] : "nil"
        type = type == "DepositEvent" ? "Deposit" : "Withdraw"
        let his_detail = {
            "wallet":resp[i].sender,
            "type":type,
            "amount":resp[i].parsedJson.amount,
            "tx_hash":resp[i].id.txDigest,
            "url":`https://suiexplorer.com/txblock/${resp[i].id.txDigest}?network=devnet`,
            "timestamp": resp[i].timestamp
        }

        res_history.push(his_detail)
    }

    res.json(res_history)
})

//implement decentralized asset management service -> generate NFT token 


app.listen(process.env.PORT || 3000);

module.exports = app;