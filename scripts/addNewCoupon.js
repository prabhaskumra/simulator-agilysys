var couponData = db.get('coupons').value()
var newCoupon = {}
var couponFlags = {}

// creates the new coupon object and the check flags
function addNewCoupon(){
    couponData = db.get('coupons').value()
    newCoupon = {
        "CouponNumber": "",
        "Balance": ""
    }

    couponFlags = {
        "CouponNumber": false,
        "Balance": false,
      }
}

// writes the new coupon created in the database
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
    if(document.getElementById('balance').value != "" && document.getElementById('couponNumber').value != ""){
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