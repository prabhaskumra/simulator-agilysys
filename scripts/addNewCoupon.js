var couponData = db.get('coupons').value()
var newCoupon = {}
var couponFlags = {}

function addNewCoupon(){
    newCoupon = {
        "CouponNumber": "",
        "Balance": ""
    }

    couponFlags = {
        "CouponNumber": false,
        "Balance": false,
      }
}

function saveCouponForm(){
    couponData.push({
        CouponNumber: document.getElementById('couponNumber').value,
        Balance: document.getElementById('balance').value
    })
    db.set('players', playerData).write()
    updateCouponTable()
    addNewCoupon()
    checkCouponFlag()

    document.getElementById('save-coupon').textContent = "New Coupon Added Successfully!";

    setTimeout(function(){
        document.getElementById('save-coupon').textContent = "";
    },3000);

    document.getElementById("coupon-form").reset();
}

function checkCouponFlag(){
    console.log('fuck')
    if(document.getElementById('balance').value != "" && document.getElementById('couponNumber').value != ""){
        console.log('dick')
        document.getElementById("save-coupon-button").disabled = false
    }
    else{
        document.getElementById("save-coupon-button").disabled = true
    }
}

function newCouponWindow(){
    document.getElementById('add-coupon').style.display = 'block'
    document.getElementById('edit-coupons').style.display = 'none'
    addNewCoupon()
    document.getElementById("save-coupon-button").disabled = true
}

function loadCouponTable(){
    document.getElementById('add-coupon').style.display = 'none'
    document.getElementById('edit-coupons').style.display = 'block'
}