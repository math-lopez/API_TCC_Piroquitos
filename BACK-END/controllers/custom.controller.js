// Importações.
const db = require("../services/database.service");

// Declaração do módulo que será exportado.
let controller = {};

// Método para consulta de alunos por Aula e Professor.
controller.getAlunosByAulaAndProf = async function (response, param) {
    const conn = await db.conn();
    const query = "SELECT A.aulaId, B.presenca,  C.alunoId,  C.nome, C.RA " + 
    "FROM Aulas_TB as A, Aluno_TB_has_Aulas_TB as B, Aluno_TB as C " + 
    "WHERE A.aulaId=B.aulaId_FK AND B.alunoId_FK=C.alunoId " +
    "AND A.profId_FK=? AND  A.aulaId=?;";

    db.execute(conn, query, [param.profId_FK, param.aulaId])
        .then((result) => {
            console.log("Consulta de alunos por aula e professor realizado com sucesso.");
            response.status(200)
                .json(result)
                .end();
        })
        .catch((err) => {
            console.log("Houve um erro na consulta de alunos por aula e professor: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para consulta de dados do Aluno.
controller.getAlunosData = async function (response) {
    const conn = await db.conn();
    const query = "SELECT A.alunoId, A.nome, A.RA, C.login, C.tipo " + 
    "FROM Aluno_TB as A, Usuarios_TB as C WHERE A.login_FK=C.login;";

    db.execute(conn, query)
        .then((result) => {
            console.log("Consulta de dados dos alunos realizado com sucesso.");
            response.status(200)
                .json(result)
                .end();
        })
        .catch((err) => {
            console.log("Houve um erro na consulta de dados dos alunos: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para consulta de dados do funcionário.
controller.getFuncData = async function (response) {
    const conn = await db.conn();
    const query = "SELECT A.funcionarioId, A.nome, A.funcional, C.login, C.tipo " + 
    "FROM Func_TB as A, Usuarios_TB as C WHERE A.login_FK=C.login;";

    db.execute(conn, query)
        .then((result) => {
            console.log("Consulta de dados dos funcionários realizado com sucesso.");
            response.status(200)
                .json(result)
                .end();
        })
        .catch((err) => {
            console.log("Houve um erro na consulta de dados dos funcionários: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para consulta de dados das aulas em que o aluno está cadastrado.
controller.getAulasPorAluno = async function (response, alunoId) {
    const conn = await db.conn();
    const query = "SELECT A.aulaId, A.nome as 'Aula', B.funcionarioId, B.nome AS 'Prof', C.presenca " + 
    "FROM Aulas_TB AS A, Func_TB AS B, Aluno_TB_has_Aulas_TB AS C " + 
    "WHERE C.aulaId_FK=A.aulaId AND A.profId_FK=B.funcionarioId AND C.alunoId_FK=?;";

    db.execute(conn, query, [alunoId])
        .then((result) => {
            if(result.length>0){
                console.log("Consulta de dados das aulas do aluno realizado com sucesso.");
                response.status(200)
                    .json(result)
                    .end();
            }
            else{
                console.log("Não existe registro de aluno com o Id recebido.");
                response.status(404)
                    .json({ "Erro": "Não existe registro de aluno com o Id recebido." })
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na consulta de dados das aulas do aluno: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Exportação do módulo.
module.exports = controller;