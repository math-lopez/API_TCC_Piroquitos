// Importações.
var router = require('express').Router();
const controller = require("../controllers/usuarios.controller");
const params2json = require("../helpers/Param2Json.helper");


// Endpoint para adicionar novo usuário.
router.post('/add', async function(req, res) {
    const usuario = params2json.toUsuario(req.body);
    controller.novoUsuario(res, usuario);
});

// Endpoint para validar usuários.
router.post('/validate', async function(req, res) {
    const usuario = params2json.toUsuario(req.body);
    controller.validaUsuario(res, usuario.login, usuario.senha);
});

// Endpoint para buscar usuários.
router.post('/search', async function(req, res) {
    const usuario = params2json.toUsuario(req.body);
    controller.getUsuario(res, usuario.login);
});

// Endpoint para editar usuários.
router.post('/update', async function(req, res) {
    const usuario = params2json.toUsuario(req.body);
    controller.editaUsuario(res, usuario);
});

// Endpoint para remover usuários.
router.post('/remove', async function(req, res) {
    const usuario = params2json.toUsuario(req.body);
    controller.removeUsuario(res, usuario);
});

// Exportanto módulo com todos os endpoints da rota de usuários.
module.exports = router;