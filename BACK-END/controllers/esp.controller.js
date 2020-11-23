// Importações.
const EspService = require('../services/EspService.service');
const FaceRecognitionService = require("../services/FaceRecognition.service");

// Declaração do módulo que será exportado.
let controller = {};

// Método para cadastrar aluno no sistema (salvar foto de referência).
controller.cadastrar = async function (response, ra) {
    const esp = new EspService();
    esp.initService(ra, 0, response);
}

// Método para salvar foto de busca (foto da aula).
controller.presenca = async function (response, aulaId) {
    const esp = new EspService();
    esp.initService(aulaId, 1, response);
}

// Exportação do módulo.
module.exports = controller;