// Importações.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importação das rotas das APIs.
const usuarios_routes = require('./routes/usuarios.routes');
const alunos_routes = require('./routes/alunos.routes');
const func_routes = require('./routes/func.routes');
const salas_routes = require('./routes/salas.routes');
const aulas_routes = require('./routes/aulas.routes');
const presenca_routes = require('./routes/presenca.routes');

// TODO: TIRAR ESSAS SERVICES DAQUI PARA UMA CONTROLLER. !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
const EspService = require('./services/EspService.service');
const FaceRecognitionService = require("./services/FaceRecognition.service");
 
// Declaração de constante para controle da porta do back-end.
const port = 3000;

// Instanciação e configuração do servidor.
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));    // Setting MiddleWare for parsing
app.use(bodyParser.json());

// Endpoint de teste para a coleta de imagem do ESP.
app.get('/', function (req, res) {
    let ra = req.query.ra;
    let idPhoto = req.query.idPhoto;
    let esp = new EspService();
    esp.initService(ra, idPhoto);
    res.send({});
});

// Endpoint de teste para o reconhecimento facial.
app.get('/face-api-test', async function (req, res) {
    let faceRecognitionService = new FaceRecognitionService();
    retorno = await faceRecognitionService.faceRecognize("n145986/cad_n145986_1.jpg", "n145986/cad_n145986_2.jpg");
    res.send(retorno);
});
 
// Configuração dos endpoints para as APIs.
app.use('/usuarios', usuarios_routes);
app.use('/alunos', alunos_routes);
app.use('/funcionarios', func_routes);
app.use('/salas', salas_routes);
// app.use('/aulas', aulas_routes);
app.use('/presenca', presenca_routes);

// Subindo o servidor para escutar na porta declarada.
app.listen(port, () => console.log(`Restful APIs do Back-end escutando na porta ${port}.`));