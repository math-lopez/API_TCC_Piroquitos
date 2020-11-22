// Importações.
const db = require("../services/database.service");

// Declaração do módulo que será exportado.
let controller = {};

// Método para cadastro de nova sala.
controller.novaSala = async function (response, sala) {
    const conn = await db.conn();
    const query = "INSERT INTO Salas_TB SET ?";

    db.execute(conn, query, sala)
        .then((result) => {
            console.log("Cadastro de sala realizado com sucesso.");
            response.status(200)
                .end();
        })
        .catch((err) => {
            console.log("Houve um erro no cadastro de sala: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para listagem de salas.
controller.listaSalas = async function (response) {
    const conn = await db.conn();
    const query = `SELECT * FROM Salas_TB;`;

    db.select(conn, query)
        .then((result) => {
            if(!result.length){
                console.log("Não há salas cadastradas.");
                response.status(404)
                .json({ Erro: "Não há salas cadastradas."})
                .end();
            }
            else{
                console.log("Salas listadas com sucesso.");
                response.status(200)
                    .json(result)
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na consulta de salas: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para busca de sala pelo Id.
controller.getSala = async function (response, salaId) {
    const conn = await db.conn();
    const query = `SELECT * FROM Salas_TB WHERE salaId='${salaId}';`;

    db.select(conn, query)
        .then((result) => {
            if(!result.length){
                console.log("Sala não encontrada.");
                response.status(404)
                .json({ Erro: "Sala não encontrada."})
                .end();
            }
            else{
                console.log("Sala encontrada com sucesso.");
                response.status(200)
                    .json(result[0])
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na consulta de salas: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para edição de sala.
controller.editaSala = async function (response, sala) {
    const conn = await db.conn();
    const query = "UPDATE Salas_TB SET idEsp=?, ipEsp=? Where salaId=?";
    const dadosSala = [sala.idEsp, sala.ipEsp, sala.salaId];

    db.execute(conn, query, dadosSala)
        .then((result) => {
            console.log("Edição de sala realizada com sucesso.");
            response.status(200)
                .end();
        })
        .catch((err) => {
            console.log("Houve um erro na edição de sala: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para remoção de sala.
controller.removeSala = async function (response, salaId) {
    const conn = await db.conn();
    const query = "DELETE FROM Salas_TB WHERE salaId=?";

    db.execute(conn, query, [salaId])
        .then((result) => {
            console.log("Remoção de sala realizada com sucesso.");
            response.status(200)
                .end();
        })
        .catch((err) => {
            console.log("Houve um erro na remoção de sala: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Exportação do módulo.
module.exports = controller;