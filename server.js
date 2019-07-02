    //other shit
    const express = require('express')
    const app = express()
    const port = 1234
    const path = require('path')
    const bodyParser = require('body-parser'); 
    const fs = require('fs')


    //-------------------------------------model require-------------------------------------//
    const getPlayerInfo = require('./model/GetPlayerInfo').getPlayerInfo
    const GetOffers = require('./model/GetOffers').GetOffers
    const RedeemComp = require('./model/RedeemComp').RedeemComp
    //---------------------------------------------------------------------------------------//

    //------------------------------------express setup--------------------------------------//
    app.use(express.static(__dirname));

    app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
    app.use(bodyParser.json()); // support json encoded bodies
    //---------------------------------------------------------------------------------------//





    //default load page
    app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/views/index.html')))

    //validate user api Post
    //IG will send post request and get account back - also will display account information
    app.post('/GetPlayerInfo', (req, res) => {
        //get account number and search by acct number
        accountNumber = req.body.acct
        console.log(req.body.acct)
        let account = getPlayerInfo(accountNumber)

        //write found account to json file and electron window will load it
        let transactionData = {
            "transaction": "GetPlayerInfo",
            "account": account
        }
        fs.writeFile('transaction.json', JSON.stringify(transactionData), 'utf8', (err) => {
            if(err) throw err
        })

        //send back account info
        res.send(account ? account : {"error:": "no results"})
    })

    //returns all offers from offers.json that match the account number
    app.post('/GetOffers', (req, res) => {
        let accountNumber = req.body.AccountNumber
        console.log(req.body.acct)
        let offers = GetOffers(accountNumber)
        res.send(offers)
    })

    //redeem each comp in list, i am assuming that there could be more than one
    app.post('/RedeemComp', (req, res) => {
        let accountNumber = req.body.AccountNumber
        let compList = req.body.RedeemCompList
        res.send(RedeemComp(accountNumber, compList))
    })


    app.listen(port, () => console.log(`server running on port ${port}`))