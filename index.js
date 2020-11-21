const express = require('express');
const app = express();
const EspService = require('./services/EspService.service');
const FaceRecognitionService = require("./services/FaceRecognition.service");
 
app.get('/', function (req, res) {
    let ra = req.query.ra;
    let idPhoto = req.query.idPhoto;
    let esp = new EspService();
    esp.initService(ra, idPhoto);
    res.send({});
});

app.get('/hello', function (req, res) {
    res.send({"message": "hello world!"});
});

app.get('/face-api-test', async function (req, res) {
    let faceRecognitionService = new FaceRecognitionService();
    retorno = await faceRecognitionService.faceRecognize("n145986/cad_n145986_1.jpg", "n145986/cad_n145986_2.jpg");
    res.send(retorno);
});
 
app.listen(3000);