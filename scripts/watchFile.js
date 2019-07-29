//this file watches the loghtml.txt to see if there are any changes made, if so update terminal
let loghtmlPath, logPath

//production and build enviorments direct to different paths. set accordingly
if(isProduction){
    loghtmlPath = __dirname + '/../../app/loghtml.txt'
    logPath = __dirname + '/../../app/log.txt'
} else {
    loghtmlPath = './loghtml.txt'
    logPath = './log.txt'
}

fs.watch(path.join(loghtmlPath), (event, filename) => {
    fs.readFile(path.join(loghtmlPath), (err, data) => {
        console.log(err)
        displayTerminal(data)
    })
})

function displayTerminal(data){
    document.getElementById('terminal').innerHTML = data
    addCollapsible()
    //scrolls to bottom of div
    let terminal = document.getElementById('terminal')
    terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight
}

//make terminal line collapsible - for req and res
function addCollapsible(){
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
        content.style.display = "none";
        } else {
        content.style.display = "block";
        }
    });
    }
}

//copied from writeToTerminal.js
function writeToTerminal(data, jsondata){
    let d = new Date()
    let t = d.getMonth() + "/" + d.getDay() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds() + " - "  
    out = "<p>"+ t + data + "</p>"
    
    fs.appendFileSync(path.join(loghtmlPath), out, (err) => {
        if (err) throw err;
    })
    fs.appendFileSync(path.join(logPath), t + data + '\n', (err) => {
        if (err) throw err;
    })
  }
  