//other shit
const express = require("express");
const app = express();
const path = require("path");
var bodyParser = require("body-parser");
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
const RedeemCoupon = require("./model/RedeemCoupon").RedeemCoupon;
const VoidAll = require("./model/VoidAll").VoidAll;
const RetailRating = require("./model/RetailRating").RetailRating;
const BalanceInquiry = require("./model/BalanceInquiry").BalanceInquiry;
const RetailAuthorize = require("./model/RetailAuthorize").RetailAuthorize;
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
  retailRating: 1,
  port: 8080 //default port value
}).write()

//----------------------------------------------------------------------------------------//
let server

ipcMain.on("editPort", (event, port) => {
  server.close()
  server = app.listen(port, () => writeToTerminal(`App is listening on port ${port}`));
})

//----------------------------------------------------------------------------------------//
//default load page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname + "/views/index.html"))
);

//----------------------------------------------------------------------------------------//
//validate user api Post
//IG will send post request and get account back - also will display account information
app.post("/Players/GetPlayerInfo", async(req, res) => {
  //get account number and search by acct number
  writeToTerminal("GetPlayerInfo request recieved for account " + req.body.acct, req.body)

  // this is  not what IG calls

  // let account = {
  //   "firstName": "Alice",
  //   "lastName": "Bob",
  //   "accountNumber": "0",
  //   "phoneNumber": "7024980123",
  //   "cardNumber": "1",
  //   "tierLevel": "3",
  //   "dateOfBirth": "9/9/1997",
  //   "pointBalance": "3000",
  //   "compBalance": "50",
  //   "promo2Balance": "99",
  //   "isBanned": "FALSE",
  //   "isInActive": "TRUE",
  //   "isPinLocked": "FALSE"
  // }
  

  // Origial code........ DO NOT DELETE
  let account = getPlayerInfo(req.body.acct);

  // function pointing to Everi Wallet endpoint
  // let accountFound = await BalanceInquiry(acct);

/**********************************************************
  //console.log("accoung");
  //console.log(acct);
  //console.log(account);
  //send back account info
  // account.accountNumber = acct;
  // account.pointBalance = String(accountFound.availableBalance);

************************************************************/

  res.send(account ? account : { "error:": "no results" }); //TO-DO: FIX THIS ? LOL

  writeToTerminal("GetPlayerInfo response sent for account " + req.body.acct, account)
});

//----------------------------------------------------------------------------------------//
//returns all offers from offers.json that match the account number
app.post("/Players/GetOffers", (req, res) => {
  writeToTerminal("GetOffers request recieved for account " + req.body.AccountNumber, req.body)
  let offers = GetOffers(req.body.AccountNumber);
  res.send(offers);
  writeToTerminal("GetOffers response sent for account " + req.body.AccountNumber, offers)
});

//----------------------------------------------------------------------------------------//
// redeeming an offer that is requested for redemption
app.post("/Players/RedeemOffer", (req, res) => {
  writeToTerminal("RedeemOffer request recieved for account " + req.body.AccountNumber, req.body)
  let offersAvailable = req.body.redeemOfferList;
  console.log(offersAvailable);
  let offersRedeemed = RedeemOffer(offersAvailable, req.body.AccountNumber);
  res.send(offersRedeemed);
  writeToTerminal("RedeemOffer response sent for account " + req.body.AccountNumber, offersRedeemed)
})

//----------------------------------------------------------------------------------------//
//redeem each comp in list, i am assuming that there could be more than one
app.post("/Players/RedeemComp", (req, res) => {

  // ORIGINAL CODE
   
  writeToTerminal("RedeemComp request recieved for account " + req.body.AccountNumber, req.body)
  let compList = req.body.redeemCompList;
  let redeemValues = RedeemComp(req.body.AccountNumber, compList);
  res.send(redeemValues.out);
  writeToTerminal("RedeemComp response sent for account " + req.body.AccountNumber, redeemValues.out)
  
// TEST FOR WALLET

//  writeToTerminal("RedeemComp request recieved for account " + req.body.AccountNumber, req.body)
//  let compList = req.body.redeemCompList;
//  let redeemValues = await RetailAuthorize(req.body.AccountNumber, compList);
//  res.send(redeemValues.out);
//  writeToTerminal("RedeemComp response sent for account " + req.body.AccountNumber, redeemValues.out)


});

//----------------------------------------------------------------------------------------//
app.post("/Players/RedeemPoints", (req, res) => {
  writeToTerminal("RedeemPoints request recieved for account " + req.body.AccountNumber, req.body)
  let redeemPointsList = req.body.redeemPointsList;
  let redeemValues = RedeemPoints(req.body.AccountNumber, redeemPointsList);
  res.send(redeemValues.out);
  writeToTerminal("RedeemPoints response sent for account " + req.body.AccountNumber, redeemValues.out)
});

//----------------------------------------------------------------------------------------//
app.post("/Players/RedeemCoupon",async(req, res) => {

  // ORIGINAL CODE
  // writeToTerminal("RedeemCoupon request recieved for account " + req.body.AccountNumber, req.body)
  // let redeemedCoupons = RedeemCoupon(req.body.AccountNumber, req.body.redeemCouponList)
  // res.send(redeemedCoupons)
  // writeToTerminal("RedeemCoupon response sent for account " + req.body.AccountNumber, redeemedCoupons)


  writeToTerminal("RedeemCoupon request recieved for account " + req.body.AccountNumber, req.body)

  // console.log("SASASAASASASAs")
  // console.log(req.body.redeemCouponList[0].RedeemAmount);

  let redeemedCoupons = await RetailAuthorize(req.body.AccountNumber, req.body.redeemCouponList)


  let transactionInfo = {
    AccountNumber: req.body.AccountNumber,
    RedeemCouponResultList: [
      {
        CouponNumber: "2323232",
        ReferenceId: redeemedCoupons.referenceId,
        TransactionId: redeemedCoupons.transactionId,
        SequenceId: 1,
        RedeemedAmount: req.body.redeemCouponList[0].RedeemAmount,
        BalanceAmount: redeemedCoupons.availableBalance,
        ResponseStatus: {
          IsSuccess: true,
          ErrorMessage: "",
          ErrorCode: ""
        }
      }
    ],
    ResponseStatus: {
      IsSuccess: true,
      ErrorMessage: "",
      ErrorCode: ""
    },
    CustomFields: {}
  };


  res.send(transactionInfo)

  writeToTerminal("RedeemCoupon response sent for account " + req.body.AccountNumber, redeemedCoupons)


})

//----------------------------------------------------------------------------------------//
app.post("/Players/ValidateAccount", async(req,res)=> {

  // ORIGINAL CODE, DO NOT DELETE OR RESTORE TO THIS
  /*******************************************
  writeToTerminal("ValidateAccount request recieved for " + req.body.cardNumber, req.body)
  let validatedAccounts = ValidateAccount(req.body.cardType, req.body.cardNumber)
  res.send(validatedAccounts)
  writeToTerminal("ValidateAccount response sent for account " + req.body.cardNumber, validatedAccounts)

  *****************************************/

  writeToTerminal("ValidateAccount request recieved for " + req.body.cardNumber, req.body)

  accountNumber = req.body.cardNumber;

  //let validatedAccounts = ValidateAccount(req.body.cardType, req.body.cardNumber)

  let validatedAccounts = await BalanceInquiry(accountNumber);
  console.log(validatedAccounts.availableBalance);

  //PatronResponse.PointsBalance = validatedAccounts.availableBalance;
  let PatronResponse = []
  PatronResponse.push({
      ClubStateId: 40,//hardcoded for rn
      AccountNumber: accountNumber,
      FirstName: "Alice",
      LastName: "Bob", 
      ClubState: "Gold",
      DateOfBirth: "01/01/40",
      PointsBalance: 0,
      PointsBalanceInDollars: 230.76,
      CompBalance: validatedAccounts.availableBalance,
      Promo2Balance: 0,
      IsInActive: false,
      IsPinLocked: false,
      IsBanned: false,
      ResponseResult: {
          IsSuccess: true,
          ErrorMessage: "",
          ErrorCode: ""
      }
  })

  let ResponseStatus = 
  {
    IsSuccess: true,
    ErrorMessage: "",
    ErrorCode: ""
  }

  console.log(PatronResponse);
  res.send({PatronResponse, ResponseStatus});
  writeToTerminal("ValidateAccount response sent for account " + req.body.cardNumber, validatedAccounts)


})

//----------------------------------------------------------------------------------------//
app.post("/Players/RedeemAll", (req, res) => {
  writeToTerminal("RedeemAll request recieved for account " + req.body.AccountNumber, req.body)
  //DOES IG EVEN USE THIS??????
  //if it does ill do this some day
  //all that needs to be done is set the right lists to the right functions 
  res.send({lol: "Lol"})
  writeToTerminal("RedeemAll response sent for account " + req.body.AccountNumber, req.body)
})  
//----------------------------------------------------------------------------------------//
app.post("/Players/RetailRating", (req, res) => {
  writeToTerminal("RetailRating request recieved for account " + req.body.AccountNumber, req.body)
  let out = RetailRating(req.body.AccountNumber, req.body.Amount)
  res.send(out)
  writeToTerminal("RetailRating response sent for account " + req.body.AccountNumber, out)
})
//----------------------------------------------------------------------------------------//
app.post("/Players/VoidAll", (req, res) => {
  writeToTerminal("VoidAll request recieved for account " + req.body.AccountNumber, req.body)
  let out = VoidAll(req.body.AccountNumber, req.body.voidAllList)
  res.send(out)
  writeToTerminal("VoidAll response sent for account " + req.body.AccountNumber, out)
})
server = app.listen(port, () => writeToTerminal("Started terminal."));

