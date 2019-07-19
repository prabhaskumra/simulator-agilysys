const fs = require('fs')
const path = require('path')

module.exports = function (data, jsondata){
    let d = new Date()
    let t = d.getMonth() + "/" + d.getDay() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds() + " - "  
    let out
    if(jsondata != undefined){
      out = "<p class='collapsible'>"+ t + data + "</p>"
      out += "<div class='ccontent'>" + JSON.stringify(jsondata, null, 4) +"</div>"
    } else {
      out = "<p>"+ t + data + "</p>"
    }

    fs.appendFileSync(path.join(__dirname + '/../loghtml.txt'), out, (err) => {
        if (err) throw err;
    })
    fs.appendFileSync(path.join(__dirname + '/../log.txt'), t + data + '\n', (err) => {
        if (err) throw err;
    })
  }