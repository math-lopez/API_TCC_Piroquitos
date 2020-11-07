const express = require('express')
const app = express()

const EspService = require('./services/EspService')
 
app.get('/', function (req, res) {
    let ra = req.query.ra;
    let idPhoto = req.query.idPhoto;
    let esp = new EspService();
    esp.initService(ra, idPhoto);
    res.send({});
});


 
app.listen(3000);