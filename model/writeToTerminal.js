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

    //check if file exists first, if not make file
    if(!fs.existsSync(path.join(__dirname + '/../loghtml.txt'))){
      let out = "<p>This black box will contain all requests and responses made through the simulator and other debugging logs. To see " +
      "the requests and responses made, click on the the text with underlines to expand them. </p>"
      fs.appendFileSync(path.join(__dirname + '/../loghtml.txt'), out, (error) => {
        if (error) throw error;
      })
    }
    
    fs.appendFileSync(path.join(__dirname + '/../loghtml.txt'), out, (err) => {
        if (err) throw err;
    })
    fs.appendFileSync(path.join(__dirname + '/../log.txt'), t + data + '\n', (err) => {
        if (err) throw err;
    })
  }