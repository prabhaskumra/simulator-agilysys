
    const express = require('express')
    const app = express()
    const port = 1234
    const path = require('path')
    const bodyParser = require('body-parser');
    const validateUser = require('./model/validateUser').validateUser


    app.use(express.static(__dirname));

    app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
    app.use(bodyParser.json()); // support json encoded bodies


    app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/views/index.html')))

    app.post('/validateUser', function(req, res) {
        accountNumber = req.body.acct
        console.log(req.body.acct)
        let account = validateUser(accountNumber)
        res.send(account)
    })


    app.listen(port, () => console.log(`Example app listening on port ${port}!`))