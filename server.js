    const express = require('express')
    const http = require('http')
    const app = express()
    const port = 1234
    const path = require('path')
    const bodyParser = require('body-parser');
    const validateUser = require('./model/validateUser').validateUser
    const fs = require('fs')

    app.use(express.static(__dirname));

    app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
    app.use(bodyParser.json()); // support json encoded bodies


    //default load page
    app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/views/index.html')))

    //validate user api Post
    //IG will send post request and get account back - also will display account information
    app.post('/validateUser', function(req, res) {
        //get account number and search by acct number
        accountNumber = req.body.acct
        console.log(req.body.acct)
        let account = validateUser(accountNumber)

        //write found account to json file and electron window will load it
        let accountJSON = JSON.stringify(account)
        fs.writeFile('foundAccount.json', accountJSON, 'utf8', (err) => {
            if(err) throw err
            console.log('retrieved and saved account')
        })
        
        //send back account info
        res.send(account)
    })


    app.listen(port, () => console.log(`server running on port ${port}`))