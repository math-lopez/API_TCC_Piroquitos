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

// Exportando módulo.
module.exports = helper;