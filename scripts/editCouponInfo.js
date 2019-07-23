var couponData = db.get('coupons').value()

function updateCouponTable(){
    db.read()
    couponData = db.get('coupons').value()
    console.log(couponData)
    let accountInfo = ""
    accountInfo +=(
        "<table id='couponTable' border='1' width='700'>" + 
        "<tr><th>Coupon Number</th><th>Redeem Amount</th></tr>"
    )

    for(let i = 0; i < couponData.length; i++){
        accountInfo+=(
            "<tr><td> <input type='text' name='couponNumber' class='input input1' value ='" +couponData[i].CouponNumber +"'onchange='swapCouponValues(this,"+i+")'"+"</td>" +
            "<td> <input type='text' name='redeemAccount' class='input input1' value='"+couponData[i].Balance +"'onchange='swapCouponValues(this,"+i+")'"+"</td></tr>"
        )
        
    }

    accountInfo += "</table>"
    document.getElementById('editCoupon').innerHTML = accountInfo
}

function swapCouponValues(tableElement, i){

    if(tableElement.name === 'couponNumber'){
        couponData[i].CouponNumber = tableElement.value
    }
    else if(tableElement.name === 'redeemAccount'){
        couponData[i].Balance = tableElement.value
    }

}

function filterCouponTable(value){
    let accountInfo = ""
    accountInfo +=(
        "<table id='couponTable' border='1' width='700'>" + 
        "<tr><th>Coupon Number</th><th>Redeem Amount</th></tr>"
    )

    for(let i = 0; i < couponData.length; i++){
        if(couponData[i].CouponNumber.includes(value)){
            accountInfo+=(
                "<tr><td> <input type='text' name='couponNumber' class='input input1' value ='" +couponData[i].CouponNumber +"'onchange='swapCouponValues(this,"+i+")'"+"</td>" +
                "<td> <input type='text' name='redeemAccount' class='input input1' value='"+couponData[i].Balance +"'onchange='swapCouponValues(this,"+i+")'"+"</td></tr>"
            )
        }
    }

    accountInfo += "</table>"
    document.getElementById('editCoupon').innerHTML = accountInfo
    
}

function searchCouponTable(input){
    filterCouponTable(input.value)
}

function writeCoupons(){
    db.set('coupons', couponData).write()
    document.getElementById('couponDataSaved').textContent = "Data Saved Successfully!";
    setTimeout(function(){
        document.getElementById('couponDataSaved').textContent = "";
    },3000);
}

function editCouponData(){
    updateCouponTable()
    document.getElementById('edit-coupons').style.display = 'block'
    document.getElementById('main-page').style.display = 'none'
    document.getElementById('settings-button').style.visibility = 'hidden'
    document.getElementById('couponDataSaved').textContent = ""
  }


function loadCouponMain(){
    updateCouponTable()
    document.getElementById('edit-coupons').style.display = 'none'
    document.getElementById('main-page').style.display = 'block'
    document.getElementById('settings-button').style.visibility = 'visible'
}