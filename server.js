//other shit
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const { ipcMain } = require("electron");

//-------------------------------------model require-------------------------------------//
const getPlayerInfo = require("./model/GetPlayerInfo").getPlayerInfo;
const GetOffers = require("./model/GetOffers").GetOffers;
const RedeemComp = require("./model/RedeemComp").RedeemComp;
const RedeemPoints = require("./model/RedeemPoints").RedeemPoints;
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
  pointsToDollars: 1
}).write()


//----------------------------------------------------------------------------------------//

//this below code recieves the appReady state as in, is data loaded and ready?
//api calls will return errors if data is not loaded. dab
var appReady = false;
ipcMain.on("isAppReady", (event, isAppReady) => {
  appReady = isAppReady;
});

//default load page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/index.html"))
);

app.get('/editUser', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/editUser.html'))
})

//validate user api Post
//IG will send post request and get account back - also will display account information
app.post("/Players/GetPlayerInfo", (req, res) => {
  //get account number and search by acct number
  if (!appReady) {
    res.send({ error: "data not loaded" });
    return;
  }
  let account = getPlayerInfo(req.body.acct);
  //send back account info
  res.send(account ? account : { "error:": "no results" });
  //write found account to json file and electron window will load it
  writeTransaction(
    {
      model: GetOffers
    },
    account
  );
});

//returns all offers from offers.json that match the account number
app.post("/Players/GetOffers", (req, res) => {
  if (!appReady) {
    res.send({ error: "data not loaded" });
    return;
  }
  let offers = GetOffers(req.body.AccountNumber);
  let account = getPlayerInfo(req.body.AccountNumber);
  res.send(offers);
  writeTransaction(
    {
      model: GetOffers
    },
    account
  ); //should display player info anyways
});

//redeem each comp in list, i am assuming that there could be more than one
app.post("/Players/RedeemComp", (req, res) => {
  if (!appReady) {
    res.send({ error: "data not loaded" });
    return;
  }

  let compList = req.body.RedeemCompList;
  let redeemValues = RedeemComp(req.body.AccountNumber, compList);
  res.send(redeemValues.out);
  let newCompValue = redeemValues.out.CompBalance;
  writeTransaction({
    model: "RedeemComp",
    compBalance: newCompValue,
    accountNumber: req.body.AccountNumber,
    redeemedAmount: redeemValues.redeemedTotal
  });
});

app.post("/Players/RedeemPoints", (req, res) => {
  if (!appReady) {
    res.send({ error: "data not loaded" });
    return;
  }

  let redeemPointsList = req.body.RedeemPointsList;

  let redeemValues = RedeemPoints(req.body.AccountNumber, redeemPointsList);
  res.send(redeemValues.out);

  writeTransaction({
    model: "RedeemPoints",
    pointBalance: redeemValues.out.PointsBalance,
    accountNumber: req.body.AccountNumber,
    redeemedAmount: redeemValues.redeemedTotal
  });
});

app.post("/Players/ValidateAccount", (req,res)=> {
  if (!appReady) {
    res.send({ error: "data not loaded" });
    return;
  }
  let validatedAccounts = ValidateAccount(req.body.cardType, req.body.cardNumber)
  res.send(validatedAccounts)
})
app.post("/Players/GetAccount", (req,res)=> {
  res.send({
    ye: "yes"
  })
}
)

app.listen(port, () => console.log(`server running on port ${port}`));

//writes transaction to file so that the main process (electron) can pick up what was done
function writeTransaction(transaction, account) {
  let transactionData = {
    transaction: transaction,
    account: account
  };
  fs.writeFile(
    "transaction.json",
    JSON.stringify(transactionData),
    "utf8",
    err => {
      if (err) throw err;
    }
  );
}
