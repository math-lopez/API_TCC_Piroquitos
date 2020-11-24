// Importações.
var router = require('express').Router();
const controller = require("../controllers/esp.controller");

// Endpoint de teste para a coleta de imagem do ESP.
router.get('/cadastro', function (req, res) {
    const ra = req.query.ra;
    controller.cadastrar(res, ra);
});

// Endpoint de teste para o reconhecimento facial.
router.get('/setPresenca', async function (req, res) {
    const aulaId = req.query.aulaId;
    controller.presenca(res, aulaId);
}); 

// Exportanto módulo com todos os endpoints da rota personalizada (custom).
module.exports = router;