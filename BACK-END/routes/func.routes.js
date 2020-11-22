// Importações.
var router = require('express').Router();
const controller = require("../controllers/func.controller");
const params2json = require("../helpers/Param2Json.helper");


// Endpoint para adicionar novo func.
router.post('/add', async function(req, res) {
    const funcionario = params2json.toFunc(req.body);
    controller.novoFunc(res, funcionario);
});

// Endpoint para listar funcs.
router.post('/list', async function(req, res) {
    controller.listaFuncs(res);
});

// Endpoint para buscar func por Id.
router.post('/searchById', async function(req, res) {
    const funcionario = params2json.toFunc(req.body);
    controller.getFuncById(res, funcionario.funcionarioId);
});

// Endpoint para buscar func por login.
router.post('/searchByLogin', async function(req, res) {
    const funcionario = params2json.toFunc(req.body);
    controller.getFuncByLogin(res, funcionario.login_FK);
});

// Endpoint para editar func.
router.post('/update', async function(req, res) {
    const funcionario = params2json.toFunc(req.body);
    controller.editaFunc(res, funcionario);
});

// Endpoint para remover func pelo Id.
router.post('/removeById', async function(req, res) {
    const funcionario = params2json.toFunc(req.body);
    controller.removeFuncById(res, funcionario.funcionarioId);
});

// Endpoint para remover func pelo login.
router.post('/removeByLogin', async function(req, res) {
    const funcionario = params2json.toFunc(req.body);
    controller.removeFuncByLogin(res, funcionario.login_FK);
});

// Exportanto módulo com todos os endpoints da rota de funcionários (secretária/professor).
module.exports = router;