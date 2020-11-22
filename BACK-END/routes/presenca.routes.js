// Importações.
var router = require('express').Router();
const controller = require("../controllers/presenca.controller");
const params2json = require("../helpers/Param2Json.helper");

// Endpoint para cadastrar aluno na aula.
router.post('/add', async function(req, res) {
    const presenca = params2json.toPresenca(req.body);
    controller.matricular(res, presenca);
});

// Endpoint para listar alunos matriculados na aula.
router.post('/listByAula', async function(req, res) {
    const presenca = params2json.toPresenca(req.body);
    controller.listaByAula(res, presenca.aulaId_FK);
});

// Endpoint para listar aulas em que o aluno está matriculado.
router.post('/listByAluno', async function(req, res) {
    const presenca = params2json.toPresenca(req.body);
    controller.listaByAluno(res, presenca.alunoId_FK);
});

// Endpoint para buscar presença.
router.post('/search', async function(req, res) {
    const presenca = params2json.toPresenca(req.body);
    controller.getPresenca(res, presenca);
});

// Endpoint para editar presença.
router.post('/update', async function(req, res) {
    const presenca = params2json.toPresenca(req.body);
    controller.editaPresenca(res, presenca);
});

// Endpoint para remover matrícula na aula.
router.post('/remove', async function(req, res) {
    const presenca = params2json.toPresenca(req.body);
    controller.removePresenca(res, presenca);
});

// Exportanto módulo com todos os endpoints da rota de usuários.
module.exports = router;