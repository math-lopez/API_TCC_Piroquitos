var http = require("http");
var path = require("path");
const fs = require("fs");
const request = require('request');

class EspService {
  // Flag - == 0 - Cadastro, != 0 - Presenca.
  initService(ra_ou_aulaId, flag, response) {
    if(flag==0){
      let path = this.getPathCadastro(ra_ou_aulaId);
      this.takePhoto(path, response);
    }
    else{
      let path = this.getPathPresenca(ra_ou_aulaId);
      this.takePhoto(path, response);
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

  takePhoto(path, res) {
    request.get("http://192.168.0.108/capture")
        .on("response", (response) => {
            if(response.statusCode === 200){
                console.log("Foto tirada pelo ESP.");
                setTimeout(() => {
                    let esp = new EspService();
                    esp.getPhotoEsp(path, res);
                }, 10000);
            }
        });
  }

  getPhotoEsp(path, res) {
    function callback(response) {
      var body = "";

      response.setEncoding("binary");

      response.on("data", function (chunk) {
        body += chunk;
      });

      response.on("end", function () {
        let esp = new EspService();
        esp.savePhotoStudent(path, body, res);
      });
    }

    var req = http.get("http://192.168.0.108/saved-photo", callback);
    req.end();
  }

  savePhotoStudent(path, data, res) {
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
      });
    });
  }
}

module.exports = EspService;
