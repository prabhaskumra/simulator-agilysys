const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const writeToTerminal = require("./writeToTerminal")

module.exports = {
    RedeemCoupon : function RedeemCoupon(accountNumber, couponList){
        db.read()
        let coupons = db.get('coupons').value()
        let couponsOut = []

        couponList.forEach(coupon => {
            let foundCoupon
            for(let i = 0; i < coupons.length; i++){
                if(parseInt(coupons[i].CouponNumber) === parseInt(coupon.CouponNumber))
                    foundCoupon = coupons[i]
            }
            let responseStatus
            let BalanceAmount 
            if(foundCoupon === undefined){ // coupon not found
                writeToTerminal(`Coupon ${coupon.CouponNumber} not found`)
                responseStatus = {
                    IsSuccess: false,
                    ErrorMessage: "",
                    ErrorCode: ""
                }

                let transactionIdCount = db.get('transactionId').value()
                transactionIdCount++;
                db.set('transactionId', transactionIdCount).write()
                couponsOut.push({
                    CouponNumber: coupon.CouponNumber,
                    ReferenceId: 0,
                    TransactionId: transactionIdCount,
                    SequenceId: 0,
                    RedeemedAmount: 0,
                    BalanceAmount: 0,
                    ResponseStatus: responseStatus
                })
                db.get('transactions')
                .push({
                    type: "RedeemCoupon",
                    transactionId: transactionIdCount,
                    transactionData: {
                        CouponNumber: coupon.CouponNumber,
                        RedeemedAmount: 0,
                        BalanceAmount: 0,
                        ResponseStatus: responseStatus
                    }
                })
                .write()

            } else { //3cases
                if(parseFloat(coupon.RedeemAmount) > parseFloat(foundCoupon.Balance)){ //c1: redeem amount higher than balance
                    writeToTerminal(`Coupon ${coupon.CouponNumber} Error:  redeem amount (${coupon.RedeemAmount}) higher than balance (${foundCoupon.Balance})`)
                    responseStatus = {
                        IsSuccess: false,
                        ErrorMessage: "Redeem amount higher than balance",
                        ErrorCode: ""
                    }

                    let transactionIdCount = db.get('transactionId').value()
                    transactionIdCount++;
                    db.set('transactionId', transactionIdCount).write()
                    couponsOut.push({
                        CouponNumber: coupon.CouponNumber,
                        ReferenceId: 0,
                        TransactionId: transactionIdCount,
                        SequenceId: 0,
                        RedeemedAmount: 0,
                        BalanceAmount: foundCoupon.Balance,
                        ResponseStatus: responseStatus
                    })
                    db.get('transactions')
                    .push({
                        type: "RedeemCoupon",
                        transactionId: transactionIdCount,
                        transactionData: {
                            CouponNumber: coupon.CouponNumber,
                            RedeemedAmount: 0,
                            BalanceAmount: foundCoupon.Balance,
                            ResponseStatus: responseStatus
                        }
                    })
                    .write()
                    BalanceAmount = foundCoupon.Balance
                } else if(parseFloat(coupon.RedeemAmount) === parseFloat(foundCoupon.Balance)) { //c2: equals value. In that case, delete coupon always
                    writeToTerminal(`Redeeming coupon ${coupon.CouponNumber} for ${coupon.RedeemAmount}`)
                    responseStatus = {
                        IsSuccess: true,
                        ErrorMessage: "",
                        ErrorCode: ""
                    }

                    let transactionIdCount = db.get('transactionId').value()
                    transactionIdCount++;
                    db.set('transactionId', transactionIdCount).write()
                    couponsOut.push({
                        CouponNumber: coupon.CouponNumber,
                        ReferenceId: 0,
                        TransactionId: transactionIdCount,
                        SequenceId: 0,
                        RedeemedAmount: parseFloat(foundCoupon.Balance),
                        BalanceAmount: 0,
                        ResponseStatus: responseStatus
                    })
                    db.get('transactions')
                    .push({
                        type: "RedeemCoupon",
                        transactionId: transactionIdCount,
                        transactionData: {
                            CouponNumber: coupon.CouponNumber,
                            RedeemedAmount: parseFloat(foundCoupon.Balance),
                            BalanceAmount: 0,
                            ResponseStatus: responseStatus
                        }
                    })
                    .write()
                    let newCoupons = coupons.filter(deleteCoupon => deleteCoupon.CouponNumber != coupon.CouponNumber)
                    console.log(newCoupons)
                    db.set('coupons', []).write()
                    db.set('coupons', newCoupons).write()
                    writeToTerminal(`Coupon ${coupon.CouponNumber} new balance : 0`)
                    writeToTerminal(`Removed coupon ${coupon.CouponNumber} from database`)
                    BalanceAmount = 0
                } else { //redeeming amount less than balance, either keep coupon or add balance to comps bucket
                    writeToTerminal(`Redeeming coupon ${coupon.CouponNumber} for ${coupon.RedeemAmount}`)
                    responseStatus = {
                        IsSuccess: true,
                        ErrorMessage: "",
                        ErrorCode: ""
                    }
                    //write back new balance to coupon
                    BalanceAmount = foundCoupon.Balance - coupon.RedeemAmount
                    db.get('coupons')
                    .find({CouponNumber: String(coupon.CouponNumber)})
                    .assign({Balance: String(BalanceAmount)})
                    .write()
                    writeToTerminal(`Coupon ${coupon.CouponNumber} new balance : ${BalanceAmount}`)
                    
                    let transactionIdCount = db.get('transactionId').value()
                    transactionIdCount++;
                    db.set('transactionId', transactionIdCount).write()
                    couponsOut.push({
                        CouponNumber: coupon.CouponNumber,
                        ReferenceId: 0,
                        TransactionId: transactionIdCount,
                        SequenceId: 0,
                        RedeemedAmount: coupon.RedeemAmount,
                        BalanceAmount: BalanceAmount,
                        ResponseStatus: responseStatus
                    })
                    db.get('transactions')
                    .push({
                        type: "RedeemCoupon",
                        transactionId: transactionIdCount,
                        transactionData: {
                            CouponNumber: coupon.CouponNumber,
                            RedeemedAmount: coupon.RedeemAmount,
                            BalanceAmount: BalanceAmount,
                            ResponseStatus: responseStatus
                        }
                    })
                    .write()
                }
            }
        });
        return {
            AccountNumber: accountNumber,
            RedeemCouponResultList: couponsOut,
            ResponseStatus: {
                IsSuccess: true,
                ErrorMessage: "",
                ErrorCode: ""
            }
        }
    }
}