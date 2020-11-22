// Importações.
const db = require("../services/database.service");

// Declaração do módulo que será exportado.
let controller = {};

controller.novoUsuario = async function (response, dadosUsuario) {
    const conn = await db.conn();
    const query = "INSERT INTO Usuarios_TB SET ?";

    db.insert(conn, query, dadosUsuario)
        .then((result) => {
            console.log("Cadastro de usuário realizado com sucesso.");
            response.status(200)
                .end();
        })
        .catch((err) => {
            console.log("Houve um erro no cadastro de usuário: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

controller.validaUsuario = async function (response, usuario, senha) {
    const conn = await db.conn();
    const query = `SELECT login, tipo FROM Usuarios_TB WHERE login='${usuario}' AND senha='${senha}';`;

    db.insert(conn, query)
        .then((result) => {
            if(!result.length){
                response.status(403)
                .json({ Erro: "Acesso não autorizado."})
                .end();
            }
            else{
                console.log("Usuário validado com sucesso.");
                response.status(200)
                    .json(result[0])
                    .end();
            }
        })
        .catch((err) => {
            console.log("Houve um erro na consulta de usuários: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

controller.getUsuario = async function (usuario) {
}

controller.editaUsuario = async function (usuario) {
}

controller.removeUsuario = async function (usuario) {
}

// Exportação do módulo.
module.exports = controller;