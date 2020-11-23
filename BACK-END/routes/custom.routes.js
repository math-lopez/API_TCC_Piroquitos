// Importações.
var router = require('express').Router();
const controller = require("../controllers/custom.controller");
const params2json = require("../helpers/Param2Json.helper");


// Endpoint para adicionar nova sala.
router.post('/alunosPorAula', async function(req, res) {
    const param = params2json.toAulaAndProfId(req.body);
    controller.getAlunosByAulaAndProf(res, param);
});

// Endpoint para consultar dados dos alunos.
router.post('/dadosAlunos', async function(req, res) {
    controller.getAlunosData(res);
});

// Endpoint para consultar dados dos funcionários.
router.post('/dadosFuncs', async function(req, res) {
    controller.getFuncData(res);
});

// Endpoint para consultar aulas do aluno pelo Id.
router.post('/aulasPorAluno', async function(req, res) {
    const alunoId = params2json.toAulasPorAluno(req.body);
    controller.getAulasPorAluno(res, alunoId.alunoId);
});

// Exportanto módulo com todos os endpoints da rota personalizada (custom).
module.exports = router;