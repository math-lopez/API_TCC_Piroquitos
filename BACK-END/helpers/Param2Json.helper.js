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