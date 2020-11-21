var http = require("http");
var path = require("path");
const fs = require("fs");
const request = require('request');

class EspService {
  initService(ra, idPhoto) {
    let path = this.getPath(ra, idPhoto);
     this.takePhoto(path);
  }

  getPath(ra, idPhoto) {
    let p = {};
    p.dir = path.join(__dirname, "..", "photos", ra);
    p.file = path.join(__dirname, "..", "photos", ra, `cad_${ra}_${idPhoto}.jpg`);
    return p;
  }

  takePhoto(path) {
    request.get("http://192.168.0.108/capture")
        .on("response", (response) => {
            if(response.statusCode === 200){
                console.log("Took Photo");
                setTimeout(() => {
                    let esp = new EspService();
                    esp.getPhotoEsp(path);
                }, 10000);
            }
        });
  }

  getPhotoEsp(path) {
    function callback(response) {
      var body = "";

      response.setEncoding("binary");

      response.on("data", function (chunk) {
        body += chunk;
      });

      response.on("end", function () {
        let esp = new EspService();
        esp.savePhotoStudent(path, body);
      });
    }

    var req = http.get("http://192.168.0.108/saved-photo", callback);
    req.end();
  }

  savePhotoStudent(path, data) {
    fs.mkdir(path.dir, { recursive: true }, function (err) {
      if (err) {
        console.log(err);
        return;
      }

      fs.writeFile(path.file, data, "binary", function (erro) {
        if (erro) {
          throw erro;
        }
        console.log("Arquivo salvo");
      });
    });
  }
}

module.exports = EspService;
