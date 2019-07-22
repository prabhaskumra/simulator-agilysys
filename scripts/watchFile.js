fs.watch(path.join('./loghtml.txt'), (event, filename) => {
    fs.readFile(path.join('./loghtml.txt'), (err, data) => {
        displayTerminal(data)
    })
})

function displayTerminal(data){
    document.getElementById('terminal').innerHTML = data
    addCollapsible()
    //scroll to bottom of div
    let div = document.getElementById('terminal')
    div.scrollTop = div.scrollHeight - div.clientHeight
}

//for collapsibles
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

function writeToTerminal(data, jsondata){
    let d = new Date()
    let t = d.getMonth() + "/" + d.getDay() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds() + " - "  
    out = "<p>"+ t + data + "</p>"
    
    fs.appendFileSync('./loghtml.txt', out, (err) => {
        if (err) throw err;
    })
    fs.appendFileSync('./log.txt', t + data + '\n', (err) => {
        if (err) throw err;
    })
  }
  