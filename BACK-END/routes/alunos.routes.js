// Importações.
var router = require('express').Router();
const controller = require("../controllers/alunos.controller");
const params2json = require("../helpers/Param2Json.helper");


// Endpoint para adicionar novo aluno.
router.post('/add', async function (req, res) {
    const aluno = params2json.toAluno(req.body);
    controller.novoAluno(res, aluno);
});

// Endpoint para listar alunos.
router.post('/list', async function(req, res) {
    controller.listAluno(res);
});

// Endpoint para buscar alunos pelo Id.
router.post('/searchById', async function (req, res) {
    const aluno = params2json.toAluno(req.body);
    controller.getAlunoById(res, aluno.alunoId);
});

// Endpoint para buscar alunos pelo login.
router.post('/searchByLogin', async function (req, res) {
    const aluno = params2json.toAluno(req.body);
    controller.getAlunoByLogin(res, aluno.login_FK);
});

// Endpoint para editar alunos.
router.post('/update', async function (req, res) {
    const aluno = params2json.toAluno(req.body);
    controller.editaAluno(res, aluno);
});

// Endpoint para remover alunos pelo Id.
router.post('/removeById', async function (req, res) {
    const aluno = params2json.toAluno(req.body);
    controller.removeAlunoById(res, aluno.alunoId);
});

// Endpoint para remover alunos pelo login.
router.post('/removeByLogin', async function (req, res) {
    const aluno = params2json.toAluno(req.body);
    controller.removeAlunoByLogin(res, aluno.login_FK);
});

// Exportanto módulo com todos os endpoints da rota de aluno.
module.exports = router;