// Importações.
var router = require('express').Router();
const controller = require("../controllers/aulas.controller");
const params2json = require("../helpers/Param2Json.helper");


// Endpoint para adicionar nova aula.
router.post('/add', async function(req, res) {
    const aula = params2json.toAula(req.body);
    controller.novaAula(res, aula);
});

// Endpoint para listar aulas.
router.post('/list', async function(req, res) {
    controller.listaAulas(res);
});

// Endpoint para buscar aula por Id.
router.post('/searchById', async function(req, res) {
    const aula = params2json.toAula(req.body);
    controller.getAulaById(res, aula.aulaId);
});

// Endpoint para buscar aula por Id do professor.
router.post('/searchByIdProf', async function(req, res) {
    const aula = params2json.toAula(req.body);
    controller.getAulaByIdProf(res, aula.profid_FK);
});

// Endpoint para editar aula.
router.post('/update', async function(req, res) {
    const aula = params2json.toAula(req.body);
    controller.editaAula(res, aula);
});

// Endpoint para remover aula pelo Id.
router.post('/removeById', async function(req, res) {
    const aula = params2json.toAula(req.body);
    controller.removeAulaById(res, aula.aulaId);
});


// Exportanto módulo com todos os endpoints da rota de funcionários (secretária/professor).
module.exports = router;