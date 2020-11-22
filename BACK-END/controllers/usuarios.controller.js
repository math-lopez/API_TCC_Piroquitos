// Importações.
const db = require("../services/database.service");

// Declaração do módulo que será exportado.
let controller = {};

// Método para cadastro de novo usuário.
controller.novoUsuario = async function (response, dadosUsuario) {
    const conn = await db.conn();
    const query = "INSERT INTO Usuarios_TB SET ?";

    db.execute(conn, query, dadosUsuario)
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

// Método para validação (login) de usuário.
controller.validaUsuario = async function (response, usuario, senha) {
    const conn = await db.conn();
    const query = `SELECT login, tipo FROM Usuarios_TB WHERE login='${usuario}' AND senha='${senha}';`;

    db.select(conn, query)
        .then((result) => {
            if(!result.length){
                console.log("Usuário inválido.");
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

// Método para consulta de usuário pelo login.
controller.getUsuario = async function (response, usuario) {
    const conn = await db.conn();
    const query = `SELECT login, tipo FROM Usuarios_TB WHERE login='${usuario}';`;

    db.select(conn, query)
        .then((result) => {
            if(!result.length){
                console.log("Usuário não encontrado.");
                response.status(403)
                .json({ Erro: "Usuário não encontrado."})
                .end();
            }
            else{
                console.log("Usuário encontrado com sucesso.");
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

// Método para edição de usuário.
controller.editaUsuario = async function (response, usuario) {
    const conn = await db.conn();
    
    var query = "";
    var dadosUsuario = [];

    if(usuario.senha == undefined){
        query = "UPDATE Usuarios_TB SET tipo=? Where login=?";
        dadosUsuario = [usuario.tipo, usuario.login];
    }
    else {
        query = "UPDATE Usuarios_TB SET senha=?, tipo=? Where login=?";
        dadosUsuario = [usuario.senha, usuario.tipo, usuario.login];
    }

    db.execute(conn, query, dadosUsuario)
        .then((result) => {
            console.log("Edição de usuário realizada com sucesso.");
            response.status(200)
                .end();
        })
        .catch((err) => {
            console.log("Houve um erro na edição do usuário: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Método para remoção de usuário.
controller.removeUsuario = async function (response, usuario) {
    const conn = await db.conn();
    const query = "DELETE FROM Usuarios_TB WHERE login=?";

    db.execute(conn, query, [usuario.login])
        .then((result) => {
            console.log("Remoção de usuário realizada com sucesso.");
            response.status(200)
                .end();
        })
        .catch((err) => {
            console.log("Houve um erro na remoção do usuário: " + err)
            response.status(500)
                .json({ QueryResult: err})
                .end();
        });
}

// Exportação do módulo.
module.exports = controller;