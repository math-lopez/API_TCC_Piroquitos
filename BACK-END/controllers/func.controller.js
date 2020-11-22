// Importações.
const db = require("../services/database.service");

// Declaração do módulo que será exportado.
let controller = {};

// Método para cadastro de novo funcionário.
controller.novoFunc = async function (response, func) {
    const conn = await db.conn();
    const query = "INSERT INTO Func_TB SET ?";

    db.execute(conn, query, func)
        .then((result) => {
            console.log("Cadastro de funcionário realizado com sucesso.");
            response.status(200)
                .end();
        })
        .catch((err) => {
            console.log("Houve um erro no cadastro de funcionário: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para listagem de funcionários.
controller.listaFuncs = async function (response) {
    const conn = await db.conn();
    const query = `SELECT * FROM Func_TB;`;

    db.select(conn, query)
        .then((result) => {
            if(!result.length){
                console.log("Não há funcionários cadastrados.");
                response.status(404)
                .json({ Erro: "Não há funcionários cadastrados."})
                .end();
            }
            else{
                console.log("Funcionários listados com sucesso.");
                response.status(200)
                    .json(result)
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na consulta de funcionários: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para busca de funcionário pelo Id.
controller.getFuncById = async function (response, funcId) {
    const conn = await db.conn();
    const query = `SELECT * FROM Func_TB WHERE funcionarioId='${funcId}';`;

    db.select(conn, query)
        .then((result) => {
            if(!result.length){
                console.log("Funcionário não encontrado.");
                response.status(404)
                .json({ Erro: "Funcionário não encontrado."})
                .end();
            }
            else{
                console.log("Funcionário encontrado com sucesso.");
                response.status(200)
                    .json(result[0])
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na consulta de funcionários: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para busca de funcionário pelo login_FK.
controller.getFuncByLogin = async function (response, login) {
    const conn = await db.conn();
    const query = `SELECT * FROM Func_TB WHERE login_FK='${login}';`;

    db.select(conn, query)
        .then((result) => {
            if(!result.length){
                console.log("Funcionário não encontrado.");
                response.status(404)
                .json({ Erro: "Funcionário não encontrado."})
                .end();
            }
            else{
                console.log("Funcionário encontrado com sucesso.");
                response.status(200)
                    .json(result[0])
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na consulta de funcionários: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para edição de funcionário.
controller.editaFunc = async function (response, func) {
    const conn = await db.conn();
    const query = "UPDATE Func_TB SET nome=?, funcional=?, login_FK=? Where funcionarioId=?";
    const dadosSala = [func.nome, func.funcional, func.login_FK, func.funcionarioId];

    db.execute(conn, query, dadosSala)
        .then((result) => {
            if(result.affectedRows > 0){
                console.log("Edição de funcionário realizada com sucesso.");
                response.status(200)
                    .end();
            }
            else{
                console.log("O funcionário informado não existe para alteração.")
                response.status(404)
                    .json({ "Erro": "O funcionário informado não existe para alteração."} )
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na edição de funcionário: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para remoção de funcionário pelo Id.
controller.removeFuncById = async function (response, funcId) {
    const conn = await db.conn();
    const query = "DELETE FROM Func_TB WHERE funcionarioId=?";

    db.execute(conn, query, [funcId])
        .then((result) => {
            if(result.affectedRows > 0){
                console.log("Remoção de funcionário realizada com sucesso.");
                response.status(200)
                    .end();
            }
            else{
                console.log("O funcionário informado não existe para deleção.")
                response.status(404)
                    .json({ "Erro": "O funcionário informado não existe para deleção."} )
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na remoção de funcionário: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para remoção de funcionário pelo login_FK.
controller.removeFuncByLogin = async function (response, login) {
    const conn = await db.conn();
    const query = "DELETE FROM Func_TB WHERE login_FK=?";

    db.execute(conn, query, [login])
        .then((result) => {
            if(result.affectedRows > 0){
                console.log("Remoção de funcionário realizada com sucesso.");
                response.status(200)
                    .end();
            }
            else{
                console.log("O funcionário informado não existe para deleção.")
                response.status(404)
                    .json({ "Erro": "O funcionário informado não existe para deleção."} )
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na remoção de funcionário: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Exportação do módulo.
module.exports = controller;