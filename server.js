
    const express = require('express')
    const app = express()
    const port = 1234
    const path = require('path')
    var bodyParser = require('body-parser');

    app.use(express.static(__dirname));

    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

    app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/views/index.html')))

    app.post('/users', function(req, res) {
        res.sendFile(path.join(__dirname + '/data.json'))
    })


    app.listen(port, () => console.log(`Example app listening on port ${port}!`))