const { IFFT } = require("@tensorflow/tfjs-node");

// Declarando módulo.
let helper = {};

// Helper para definir o objeto de usuário da maneira esperada.
helper.toUsuario = function (body){
    if(body.login == undefined){
        return {};
    }
    else if(body.senha != undefined && body.tipo != undefined){
        return {"login": body.login, "senha": body.senha, "tipo": body.tipo};
    }
    else if(body.senha != undefined && body.tipo == undefined){
        return {"login": body.login, "senha": body.senha};
    }
    else if(body.senha == undefined && body.tipo == undefined){
        return {"login": body.login};
    }
}

helper.toAluno = function (body){
    if(body.nome != undefined && body.ra != undefined && body.usuarioId_FK != undefined   ){ //situação para cadastrar o aluno
        return {"nome": body.nome, "ra": body.ra, "usuarioId_FK": body.usuarioId_FK};
    }else if(body.ra != undefined && body.nome == undefined && body.usuarioId_FK == undefined){ //situação para buscar e remover o aluno
        return {"ra": body.ra}
    }else if(body.nome != undefined && body.ra != undefined && body.usuarioId_FK == undefined){ //situação para alterar o aluno
        return {"nome": body.nome, "ra": body.ra}
    }else{
        return {};
    }
}

// Helper para definir o objeto de salas da maneira esperada.
helper.toSala = function(body){
    if(body.salaId == undefined && body.idEsp == undefined && body.ipEsp == undefined){
        return {};
    }
    else if(body.idEsp != undefined && body.ipEsp != undefined && body.salaId == undefined){
        return { "idEsp": body.idEsp, "ipEsp": body.ipEsp };
    }
    else if(body.idEsp != undefined && body.ipEsp != undefined && body.salaId != undefined){
        return { "salaId": body.salaId, "idEsp": body.idEsp, "ipEsp": body.ipEsp  };
    }
    else if(body.idEsp == undefined && body.ipEsp == undefined && body.salaId != undefined){
        return { "salaId": body.salaId };
    }
}

// Exportando módulo.
module.exports = helper;