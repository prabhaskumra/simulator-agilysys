//other shit
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const { ipcMain } = require("electron");
const port = 8080

//-------------------------------------model require-------------------------------------//
const writeToTerminal = require("./model/writeToTerminal")
const getPlayerInfo = require("./model/GetPlayerInfo").getPlayerInfo;
const GetOffers = require("./model/GetOffers").GetOffers;
const RedeemComp = require("./model/RedeemComp").RedeemComp;
const RedeemPoints = require("./model/RedeemPoints").RedeemPoints;
const RedeemOffer = require("./model/RedeemOffer").RedeemOffer;
const ValidateAccount = require("./model/ValidateAccount").ValidateAccount;
//---------------------------------------------------------------------------------------//

//------------------------------------express setup--------------------------------------//
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies
//---------------------------------------------------------------------------------------//

//-----------------------------------database setup--------------------------------------//
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({               //default for db if non exist
  players: [], //holds players
  offers: [], //holds offers
  coupons: [], //holds coupons (gift card????)
  transactions: [], //holds all transactions
  transactionId: 0, //increment transaction id per transaction
  pointsToDollars: 1,
  port: 8080 //default port value
}).write()

//----------------------------------------------------------------------------------------//

//this below code recieves the appReady state as in, is data loaded and ready?
//api calls will return errors if data is not loaded. dab
let appReady = false;
let server

ipcMain.on("isAppReady", (event, isAppReady) => {
  appReady = isAppReady;
});

ipcMain.on("editPort", (event, port) => {
  server.close()
  server = app.listen(port, () => writeToTerminal(`App is listening on port ${port}`));
})

//default load page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/index.html"))
);

app.get('/editUser', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/editUser.html'))
  writeToTerminal("Opened edit user page.")
})

//validate user api Post
//IG will send post request and get account back - also will display account information
app.post("/Players/GetPlayerInfo", (req, res) => {
  //get account number and search by acct number
  writeToTerminal("GetPlayerInfo request recieved for account " + req.body.acct, req.body)
  if (!appReady) {
    res.send({ error: "data not loaded" });
    writeToTerminal("Error: App not ready (GetPlayerInfo)")
    return;
  }
  let account = getPlayerInfo(req.body.acct);
  //send back account info
  res.send(account ? account : { "error:": "no results" });
  writeToTerminal("GetPlayerInfo response sent for account " + req.body.acct, account)
});

//returns all offers from offers.json that match the account number
app.post("/Players/GetOffers", (req, res) => {
  writeToTerminal("GetOffers request recieved for account " + req.body.AccountNumber, req.body)
  if (!appReady) {
    res.send({ error: "data not loaded" });
    writeToTerminal("Error: App not ready (GetOffers)")
    return;
  }
  let offers = GetOffers(req.body.AccountNumber);
  let account = getPlayerInfo(req.body.AccountNumber);
  res.send(offers);
  writeToTerminal("GetOffers response sent for account " + req.body.AccountNumber, offers)
});


// redeeming an offer that is requested for redemption
app.post("/Players/RedeemOffer", (req, res) => {
  // let offer = GetOffers(req.body.AccountNumber);
  // let account = getPlayerInfo(req.body.AccountNumber);
  let offersAvailable = req.body.RedeemOfferList;
  console.log(offersAvailable);
  let offersRedeemed = RedeemOffer(offersAvailable, req.body.AccountNumber);

  res.send(offersRedeemed);
})



//redeem each comp in list, i am assuming that there could be more than one
app.post("/Players/RedeemComp", (req, res) => {
  writeToTerminal("RedeemComp request recieved for account " + req.body.AccountNumber, req.body)
  if (!appReady) {
    res.send({ error: "data not loaded" });
    writeToTerminal("Error: App not ready (RedeemComp)")
    return;
  }

  let compList = req.body.RedeemCompList;
  let redeemValues = RedeemComp(req.body.AccountNumber, compList);
  res.send(redeemValues.out);
  writeToTerminal("RedeemComp response sent for account " + req.body.AccountNumber, redeemValues.out)
});

app.post("/Players/RedeemPoints", (req, res) => {
  writeToTerminal("RedeemComp request recieved for account " + req.body.AccountNumber, req.body)
  if (!appReady) {
    res.send({ error: "data not loaded" });
    writeToTerminal("Error: App not ready (RedeemPoints)")
    return;
  }

  let redeemPointsList = req.body.RedeemPointsList;

  let redeemValues = RedeemPoints(req.body.AccountNumber, redeemPointsList);
  res.send(redeemValues.out);
  writeToTerminal("RedeemPoints response sent for account " + req.body.AccountNumber, redeemValues.out)
});

app.post("/Players/ValidateAccount", (req,res)=> {
  writeToTerminal("ValidateAccount request recieved for account " + req.body.cardNumber, req.body)
  if (!appReady) {
    res.send({ error: "data not loaded" });
    writeToTerminal("Error: App not ready (ValidateAccount)")
    return;
  }
  let validatedAccounts = ValidateAccount(req.body.cardType, req.body.cardNumber)
  res.send(validatedAccounts)
  writeToTerminal("ValidateAccount response sent for account " + req.body.cardNumber, validatedAccounts)
})

server = app.listen(port, () => console.log('yes i loaded'));

module.exports = {
  writeToTerminal: function (data, jsondata) {
    writeToTerminal(data, jsondata)
  }
}
