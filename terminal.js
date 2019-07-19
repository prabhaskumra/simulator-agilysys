function writeToTerminal(data){
    fs.appendFile(path.join(__dirname + '/log.txt'), data, (err) => {
        console.log('error printing to terminal')
    })
}