// Importações.
var http = require("http");
var path = require("path");
const fs = require("fs");
const request = require('request');
const controllerFaceRecognition = require("../controllers/FaceRecognition.controller");

class EspService {
  // Flag - == 0 - Cadastro, != 0 - Presenca.
  initService(ra_ou_aulaId, flag, response) {
    if(flag==0){
      let path = this.getPathCadastro(ra_ou_aulaId);
      this.takePhoto(path, response, flag, ra_ou_aulaId);
    }
    else{
      let path = this.getPathPresenca(ra_ou_aulaId);
      this.takePhoto(path, response, flag, ra_ou_aulaId);
    }
  }

  getPathCadastro(ra) {
    let p = {};
    p.dir = path.join(__dirname, "..", "photos", ra);
    p.file = path.join(__dirname, "..", "photos", ra, `cad_${ra}.jpg`);
    return p;
  }

  getPathPresenca(aulaId) {
    let p = {};
    p.dir = path.join(__dirname, "..", "photos", "AULAS");
    p.file = path.join(__dirname, "..", "photos", "AULAS", `presenca_${aulaId}.jpg`);
    return p;
  }

  takePhoto(path, res, flag, ra_ou_aulaId) {
    request.get("http://192.168.0.108/capture")
        .on("response", (response) => {
            if(response.statusCode === 200){
                console.log("Foto tirada pelo ESP.");
                setTimeout(() => {
                    let esp = new EspService();
                    esp.getPhotoEsp(path, res, flag, ra_ou_aulaId);
                }, 10000);
            }
        });
  }

  getPhotoEsp(path, res, flag, ra_ou_aulaId) {
    function callback(response) {
      var body = "";

      response.setEncoding("binary");

      response.on("data", function (chunk) {
        body += chunk;
      });

      response.on("end", function () {
        let esp = new EspService();
        esp.savePhoto(path, body, res, flag, ra_ou_aulaId);
      });
    }

    var req = http.get("http://192.168.0.108/saved-photo", callback);
    req.end();
  }

  savePhoto(path, data, res, flag, ra_ou_aulaId) {
    fs.mkdir(path.dir, { recursive: true }, function (err) {
      if (err) {
        console.log(err);
        console.log("Erro ao criar pasta.");
        res.status(500)
            .json({ "Erro": "Erro ao criar pasta." })
            .end();
        return;
      }

      fs.writeFile(path.file, data, "binary", function (erro) {
        if (erro) {
          console.log(erro);
          console.log("Erro ao armazenar foto.");
          res.status(500)
              .json({ "Erro": "Erro ao armazenar foto." })
              .end();
          return;
        }

        console.log("Foto salva no caminho: " + path.file);
        res.status(200)
            .json({ "Message": "Foto do aluno cadastrada com sucesso." })
            .end();

        // Caso seja a requisição de início de aula.
        if(flag!=0){
          controllerFaceRecognition.initCalcPresenca(ra_ou_aulaId);
        }

      });
    });
  }
}

module.exports = EspService;
