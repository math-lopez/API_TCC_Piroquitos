// Importações.
const db = require("../services/database.service");

// Declaração do módulo que será exportado.
let controller = {};

// Método para cadastrar aluno na aula.
controller.matricular = async function (response, presenca) {
    const conn = await db.conn();
    const query = "INSERT INTO Aluno_TB_has_Aulas_TB SET ?";

    presenca.presenca = null;

    db.execute(conn, query, presenca)
        .then((result) => {
            console.log("Matrícula na aula realizada com sucesso.");
            response.status(200)
                .end();
        })
        .catch((err) => {
            console.log("Houve um erro na matrícula na aula: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para listar alunos matriculados na aula.
controller.listaByAula = async function (response, aulaId) {
    const conn = await db.conn();
    const query = `SELECT * FROM Aluno_TB_has_Aulas_TB WHERE aulaId_FK='${aulaId}';`;

    db.select(conn, query)
        .then((result) => {
            if(!result.length){
                console.log("Não há matrículas nesta aula.");
                response.status(404)
                .json({ Erro: "Não há matrículas nesta aula."})
                .end();
            }
            else{
                console.log("Matrículas na aula listadas com sucesso.");
                response.status(200)
                    .json(result)
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na consulta matrículas por aula: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para listar aulas em que o aluno está matriculado.
controller.listaByAluno = async function (response, alunoId) {
    const conn = await db.conn();
    const query = `SELECT * FROM Aluno_TB_has_Aulas_TB WHERE alunoId_FK='${alunoId}';`;

    db.select(conn, query)
        .then((result) => {
            if(!result.length){
                console.log("Não há aulas cadastradas para este aluno.");
                response.status(404)
                .json({ Erro: "Não há aulas cadastradas para este aluno."})
                .end();
            }
            else{
                console.log("Aulas do aluno listadas com sucesso.");
                response.status(200)
                    .json(result)
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na consulta aulas do aluno: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para buscar presença.
controller.getPresenca = async function (response, presenca) {
    const conn = await db.conn();
    const query = `SELECT * FROM Aluno_TB_has_Aulas_TB WHERE alunoId_FK='${presenca.alunoId_FK}' AND aulaId_FK='${presenca.aulaId_FK}';`;

    db.select(conn, query)
        .then((result) => {
            if(!result.length){
                console.log("Matrícula não encontrada.");
                response.status(404)
                .json({ Erro: "Matrícula não encontrada."})
                .end();
            }
            else{
                console.log("Matrícula encontrada com sucesso.");
                response.status(200)
                    .json(result[0])
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na consulta de matrícula: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para edição de presenca.
controller.editaPresenca = async function (response, presenca) {
    const conn = await db.conn();
    const query = "UPDATE Aluno_TB_has_Aulas_TB SET presenca=? WHERE alunoId_FK=? AND aulaId_FK=?;";
    const dadosPresenca = [presenca.presenca, presenca.alunoId_FK, presenca.aulaId_FK];

    db.execute(conn, query, dadosPresenca)
        .then((result) => {
            if(result.affectedRows > 0){
                console.log("Edição de presença realizada com sucesso.");
                response.status(200)
                    .end();
            }
            else{
                console.log("A matrícula informada não existe para alteração.")
                response.status(404)
                    .json({ "Erro": "A matrícula informada não existe para alteração."} )
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na edição de presença: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para remoção de presença.
controller.removePresenca = async function (response, presenca) {
    const conn = await db.conn();
    const query = "DELETE FROM Aluno_TB_has_Aulas_TB WHERE alunoId_FK=? AND aulaId_FK=?;";

    db.execute(conn, query, [presenca.alunoId_FK , presenca.aulaId_FK])
        .then((result) => {
            if(result.affectedRows > 0){
                console.log("Remoção de matrícula realizada com sucesso.");
                response.status(200)
                    .end();
            }
            else{
                console.log("A matrícula informada não existe para deleção.")
                response.status(404)
                    .json({ "Erro": "A matrícula informada não existe para deleção."} )
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na remoção de matrícula: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Exportação do módulo.
module.exports = controller;