// Importações.
const mysql = require('mysql');

// Declaração de constantes.
const USUARIO_MYSQL = "root";
const SENHA_MYSQL = "toor";
const BD_MYSQL = "tcc";

const con = mysql.createConnection({
    host: 'localhost',
    user: USUARIO_MYSQL,
    password: SENHA_MYSQL,
    database: BD_MYSQL
});

// Declarando módulo.
let db = {};

db.conn = async function (){
    con.connect((err) => {
        if(err && err!="Error: Cannot enqueue Handshake after already enqueuing a Handshake."){
          console.log("Erro ao conectar no banco de dados MySQL.");
          return;
        }
        else if(err && err=="Error: Cannot enqueue Handshake after already enqueuing a Handshake."){
            return;
        }

        console.log("Conexão com MySQL estabelecida com sucesso.");
    });

    return con;
}

db.disc = async function (con){
    con.end((err) => {
        if(err){
            console.log("Erro ao desconectar do banco de dados MySQL.");
            return;
        }

        console.log("Desconectado do banco de dados MySQL.");
    });
}

db.insert = function (conn, query, dados) {
    return new Promise((resolve, reject) => {
        conn.query(query, dados, function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
};

db.select =function (conn, query) {
    return new Promise((resolve, reject) => {
        conn.query(query, function (err, rows) {
            if (err) reject(err);
            resolve(result);
        });
    });
}

// Exportando módulo.
module.exports = db;