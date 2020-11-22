// Importações.
var router = require('express').Router();
const controller = require("../controllers/salas.controller");
const params2json = require("../helpers/Param2Json.helper");


// Endpoint para adicionar nova sala.
router.post('/add', async function(req, res) {
    const sala = params2json.toSala(req.body);
    controller.novaSala(res, sala);
});

// Endpoint para listar salas.
router.post('/list', async function(req, res) {
    controller.listaSalas(res);
});

// Endpoint para buscar sala.
router.post('/search', async function(req, res) {
    const sala = params2json.toSala(req.body);
    controller.getSala(res, sala.salaId);
});

// Endpoint para editar sala.
router.post('/update', async function(req, res) {
    const sala = params2json.toSala(req.body);
    controller.editaSala(res, sala);
});

// Endpoint para remover sala.
router.post('/remove', async function(req, res) {
    const sala = params2json.toSala(req.body);
    controller.removeSala(res, sala.salaId);
});

// Exportanto módulo com todos os endpoints da rota de usuários.
module.exports = router;