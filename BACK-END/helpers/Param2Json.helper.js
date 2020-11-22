// Declarando módulo.
let helper = {};

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
    else if(body.senha == undefined && body.tipo != undefined){
        return {"login": body.login};
    }
}

// Exportando módulo.
module.exports = helper;