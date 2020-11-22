// Importações.
var router = require('express').Router();
const controller = require("../controllers/alunos.controller");
const params2json = require("../helpers/Param2Json.helper");


// Endpoint para adicionar novo aluno.
router.post('/add', async function(req, res) {
    const aluno = params2json.toAluno(req.body);
    controller.novoAluno(res, aluno);
});

// Endpoint para listar alunos.
/*router.post('/validate', async function(req, res) {
    const usuario = params2json.toUsuario(req.body);
    controller.validaUsuario(res, usuario.login, usuario.senha);
});*/

// Endpoint para buscar alunos.
router.post('/search', async function(req, res) {
    const aluno = params2json.toAluno(req.body);
    controller.getAluno(res, aluno.ra);
});

// Endpoint para editar alunos.
router.post('/update', async function(req, res) {
    const aluno = params2json.toAluno(req.body);
    controller.editaAluno(res, aluno);
});

// Endpoint para remover alunos.
router.post('/remove', async function(req, res) {
    const aluno = params2json.toAluno(req.body);
    controller.removeAluno(res, aluno);
});

// Exportanto módulo com todos os endpoints da rota de aluno.
module.exports = router;