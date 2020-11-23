// Importações.
const db = require("../services/database.service");

// Declaração do módulo que será exportado.
let controller = {};

//Adicionando novo aluno.
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

//Listando alunos.
controller.listAluno = async function (response) {
    const conn = await db.conn();
    const query = `SELECT * FROM Aluno_TB;`;

    db.select(conn, query)
        .then((result) => {
            if(!result.length){
                console.log("Não há alunos cadastrados.");
                response.status(404)
                .json({ Erro: "Não há alunos cadastrados."})
                .end();
            }
            else{
                console.log("Alunos listados com sucesso.");
                response.status(200)
                    .json(result)
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na listagem de alunos: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

//Buscando aluno pelo Id.
controller.getAlunoById = async function (response, alunoId) {
    const conn = await db.conn();
    const query = `SELECT * FROM Aluno_TB WHERE alunoId='${alunoId}';`;

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

//Buscando aluno pelo login.
controller.getAlunoByLogin = async function (response, login) {
    const conn = await db.conn();
    const query = `SELECT * FROM Aluno_TB WHERE login_FK='${login}';`;

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

//Editar aluno.
controller.editaAluno = async function (response, aluno) {
    const conn = await db.conn();
    const query = "UPDATE Aluno_TB SET nome=?, RA=?, login_FK=? Where alunoId=?";
    const dadosAluno = [aluno.nome, aluno.ra, aluno.login_FK, aluno.alunoId];

    db.execute(conn, query, dadosAluno)
        .then((result) => {
            if(result.affectedRows > 0){
            console.log("Edição do aluno realizada com sucesso.");
            response.status(200)
                .end();
            }else{
                console.log("O aluno informado não existe para alteração.")
                response.status(404)
                .json({ "Erro": "O aluno informado não existe para alteração."} )
                .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na edição do aluno: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

//Remover aluno pelo Id.
controller.removeAlunoById = async function (response, alunoId) {
    const conn = await db.conn();
    const query = "DELETE FROM Aluno_TB WHERE alunoId=?";

    db.execute(conn, query, [alunoId])
        .then((result) => {
            if(result.affectedRows > 0){
                console.log("Remoção do aluno realizada com sucesso.");
                response.status(200)
                    .end();
            }else{
                console.log("O aluno informado não existe para deleção.")
                response.status(404)
                .json({ "Erro": "O aluno informado não existe para deleção."} )
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

//Remover aluno pelo login.
controller.removeAlunoByLogin = async function (response, login) {
    const conn = await db.conn();
    const query = "DELETE FROM Aluno_TB WHERE login_FK=?";

    db.execute(conn, query, [login])
        .then((result) => {
            if(result.affectedRows > 0){
                console.log("Remoção do aluno realizada com sucesso.");
                response.status(200)
                    .end();
            }else{
                console.log("O aluno informado não existe para deleção.")
                response.status(404)
                    .json({ "Erro": "O aluno informado não existe para deleção."} )
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