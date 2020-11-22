// Importações.
const db = require("../services/database.service");

// Declaração do módulo que será exportado.
let controller = {};

//Adicionando novo aluno
controller.novoAluno = async function (response, dadosAluno) {
    const conn = await db.conn();
    const query = "INSERT INTO Aluno_TB SET ?";

    db.execute(conn, query, dadosAluno)
        .then((result) => {
            console.log("Cadastro do aluno realizado com sucesso.");
            response.status(200)
                .end();
        })
        .catch((err) => {
            console.log("Houve um erro no cadastro do aluno: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

//Buscando aluno
controller.getAluno = async function (response, aluno) {
    const conn = await db.conn();
    const query = `SELECT nome, ra FROM Aluno_TB WHERE ra='${aluno}';`;

    db.select(conn, query)
        .then((result) => {
            if(!result.length){
                console.log("Aluno não encontrado.");
                response.status(404)
                .json({ Erro: "Aluno não encontrado."})
                .end();
            }
            else{
                console.log("Aluno encontrado com sucesso.");
                response.status(200)
                    .json(result[0])
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na consulta de aluno: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

//Editar aluno
controller.editaAluno = async function (response, aluno) {
    const conn = await db.conn();
    const query = "UPDATE Aluno_TB SET nome=? Where ra=?";
    const dadosAluno = [aluno.nome, aluno.ra];

    db.execute(conn, query, dadosAluno)
        .then((result) => {
            console.log("Edição do aluno realizada com sucesso.");
            response.status(200)
                .end();
        })
        .catch((err) => {
            console.log("Houve um erro na edição do aluno: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

//Remover aluno
controller.removeAluno = async function (response, aluno) {
    const conn = await db.conn();
    const query = "DELETE FROM Aluno_TB WHERE ra=?";

    db.execute(conn, query, [aluno.ra])
        .then((result) => {
            if(result.affectedRow > 0){
            console.log("Remoção do aluno realizada com sucesso.");
            response.status(200)
                .end();
            }else{
                console.log("O aluno informado não existe para deleção.")
                response.status(404)
                .json({ "message": "O aluno informado não existe para deleção"} )
                .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na remoção do aluno: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Exportação do módulo.
module.exports = controller;