function exportLogs(){
    let logdata, logPath
    if(isProduction){
        logPath = __dirname + '/../../app/log.txt'
    } else {
        logPath = './log.txt'
    }
    logdata = fs.readFileSync(logPath, 
        ({
            title: 'Export logs',
            filters: [{
                name: 'Log',
                extensions: ['txt']
            }],
            defaultPath: '~/logs.txt',
            buttonLabel: "Save"
        }),
        (err, data) => {
         if(err){
             writeToTerminal(err)
         } else {
             logdata = data;
         }
    })
    
    let dialog = remote.dialog
    dialog.showSaveDialog((fileName) => {
        if(fileName === undefined){
            return
        }

        fs.writeFileSync(fileName, logdata, (err) => {
            if(err){
                writeToTerminal(err)
            } else {
                writeToFile("Log successfully exported")
            }
        })
    })
}

function resetLogs(){
    let loghtmlPath, logPath
    if(isProduction){
        loghtmlPath = __dirname + '/../../app/loghtml.txt'
        logPath = __dirname + '/../../app/log.txt'
    } else {
        loghtmlPath = './loghtml.txt'
        logPath = './log.txt'
    }
    fs.unlinkSync(loghtmlPath, (err) => {
        if(err){
            writeToTerminal(err)
        } else {
            writeToTerminal("Log deleted")
        }
    })
    fs.unlinkSync(logPath, (err) => {
        if(err){
            writeToTerminal(err)
        }
    })

    writeToTerminal('Reset Log')
    writeToTerminal("This black box will contain all requests and responses made through the simulator and other debugging logs. To see " +
    "the requests and responses made, click on the the text with underlines to expand them.")
}