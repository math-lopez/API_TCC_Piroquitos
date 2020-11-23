// Importações.
const db = require("../services/database.service");

// Declaração do módulo que será exportado.
let controller = {};

// Método para cadastro de nova aula.
controller.novaAula = async function (response, aula) {
    const conn = await db.conn();
    const query = "INSERT INTO Aulas_TB SET ?";

    db.execute(conn, query, aula)
        .then((result) => {
            console.log("Cadastro de aula realizada com sucesso.");
            response.status(200)
                .end();
        })
        .catch((err) => {
            console.log("Houve um erro no cadastro de aula: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para listagem de aulas.
controller.listaAulas = async function (response) {
    const conn = await db.conn();
    const query = `SELECT * FROM Aulas_TB;`;

    db.select(conn, query)
        .then((result) => {
            if(!result.length){
                console.log("Não há aulas cadastradas.");
                response.status(404)
                .json({ Erro: "Não há aulas cadastradas."})
                .end();
            }
            else{
                console.log("Aulas listadas com sucesso.");
                response.status(200)
                    .json(result)
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na consulta de aulas: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para busca de aula pelo Id.
controller.getAulaById = async function (response, aulaId) {
    const conn = await db.conn();
    const query = `SELECT * FROM Aulas_TB WHERE aulaId='${aulaId}';`;

    db.select(conn, query)
        .then((result) => {
            if(!result.length){
                console.log("Aula não encontrada.");
                response.status(404)
                .json({ Erro: "Aula não encontrada."})
                .end();
            }
            else{
                console.log("Aula encontrada com sucesso.");
                response.status(200)
                    .json(result[0])
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na consulta de aula por id: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para busca de aula pelo Id do professor.
controller.getAulaByIdProf = async function (response, profId_FK) {
    const conn = await db.conn();
    const query = `SELECT * FROM Aulas_TB WHERE profId_FK='${profId_FK}';`;

    db.select(conn, query)
        .then((result) => {
            if(!result.length){
                console.log("Aula não encontrada.");
                response.status(404)
                .json({ Erro: "Aula não encontrada."})
                .end();
            }
            else{
                console.log("Aula encontrada com sucesso.");
                response.status(200)
                    .json(result)
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na consulta de aula por id do professor: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para edição de aula.
controller.editaAula = async function (response, aula) {
    const conn = await db.conn();
    const query = "UPDATE Aulas_TB SET nome=? , inicio_Aula=? , duracao_Min=? , profId_FK=? , salaId_FK=? Where aulaId=?";
    const dadosAula = [aula.nome, aula.inicio_Aula, aula.duracao_Min, aula.profId_FK, aula.salaId_FK, aula.aulaId];

    db.execute(conn, query, dadosAula)
        .then((result) => {
            if(result.affectedRows > 0){
            console.log("Edição de aula realizada com sucesso.");
            response.status(200)
                .end();
            }else{
                console.log("A aula informada não existe para alteração.")
                response.status(404)
                .json({ "Erro": "A aula informada não existe para alteração."} )
                .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na edição de aula: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para remoção de aula pelo Id.
controller.removeAulaById = async function (response, aulaId) {
    const conn = await db.conn();
    const query = "DELETE FROM Aulas_TB WHERE aulaId=?";

    db.execute(conn, query, [aulaId])
        .then((result) => {
            if(result.affectedRows > 0){
                console.log("Remoção da aula realizada com sucesso.");
                response.status(200)
                .end();
            }else{
                console.log("A aula informada não existe para deleção.")
                response.status(404)
                .json({ "Erro": "A aula informada não existe para deleção."} )
                .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na remoção de aula: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Exportação do módulo.
module.exports = controller;