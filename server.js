   
    //other shit
    const express = require('express')
    const app = express()
    const port = 1234
    const path = require('path')
    const bodyParser = require('body-parser'); 
    const fs = require('fs')
    const { ipcMain } = require('electron')


    //-------------------------------------model require-------------------------------------//
    const getPlayerInfo = require('./model/GetPlayerInfo').getPlayerInfo
    const GetOffers = require('./model/GetOffers').GetOffers
    const RedeemComp = require('./model/RedeemComp').RedeemComp
    const RedeemPoints = require('./model/RedeemPoints').RedeemPoints
    //---------------------------------------------------------------------------------------//


    //------------------------------------express setup--------------------------------------//
    app.use(express.static(__dirname));

    app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
    app.use(bodyParser.json()); // support json encoded bodies
    //---------------------------------------------------------------------------------------//

    //this below code recieves the appReady state as in, is data loaded and ready? 
    //api calls will return errors if data is not loaded. dab
    var appReady = false
    ipcMain.on("isAppReady", (event, isAppReady) => {
        appReady = isAppReady
    })


    //default load page
    app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/views/index.html')))

    app.get('/editUser', (req, res) => {
        res.sendFile(path.join(__dirname + '/views/editUser.html'))
    })

    //validate user api Post
    //IG will send post request and get account back - also will display account information
    app.post('/GetPlayerInfo', (req, res) => {
        //get account number and search by acct number
        if(!appReady){
            res.send({error: "data not loaded"})
            return
        }


        accountNumber = req.body.acct
        let account = getPlayerInfo(accountNumber)
        //write found account to json file and electron window will load it
        writeTransaction({
            "model": GetOffers
        }, account)
        //send back account info
        res.send(account ? account : {"error:": "no results"})
    })

    //returns all offers from offers.json that match the account number
    app.post('/GetOffers', (req, res) => {
        if(!appReady){
            res.send({error: "data not loaded"})
            return
        }
        let accountNumber = req.body.AccountNumber
        let offers = GetOffers(accountNumber)
        let account = getPlayerInfo(accountNumber)
        writeTransaction({
            "model": GetOffers
        }, account)//should display player info anyways

        res.send(offers)
    })

    //redeem each comp in list, i am assuming that there could be more than one
    app.post('/RedeemComp', (req, res) => {
        if(!appReady){
            res.send({error: "data not loaded"})
            return
        }

        let accountNumber = req.body.AccountNumber
        let compList = req.body.RedeemCompList
        let redeemValues = RedeemComp(accountNumber, compList)
        res.send(redeemValues.out)
        let newCompValue = redeemValues.out.CompBalance
        writeTransaction({
            "model": "RedeemComp",
            "compBalance" : newCompValue,
            "accountNumber" : accountNumber,
            "redeemedAmount": redeemValues.redeemedTotal
        })
    })

    app.post('/RedeemPoints', (req, res) => {
        if(!appReady){
            res.send({error: "data not loaded"})
            return
        }

        let accountNumber = req.body.AccountNumber
        let redeemPointsList = req.body.RedeemPointsList

        let redeemValues = RedeemPoints(accountNumber, redeemPointsList)
        res.send(redeemValues.out)

        writeTransaction({
            "model": "RedeemPoints",
            "pointBalance" : redeemValues.out.PointsBalance,
            "accountNumber" : accountNumber,
            "redeemedAmount": redeemValues.redeemedTotal
        })
    })


    app.listen(port, () => console.log(`server running on port ${port}`))

    function writeTransaction(transaction, account){
        let transactionData = {
            "transaction": transaction,
            "account": account
        }
        fs.writeFile('transaction.json', JSON.stringify(transactionData), 'utf8', (err) => {
            if(err) throw err
        })
    }


