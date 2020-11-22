// const { IFFT } = require("@tensorflow/tfjs-node");

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
    else {
        return {"login": body.login, "tipo": body.tipo};
    }
}

// Helper para definir o objeto de aluno da maneira esperada.
helper.toAluno = function (body){
    if(body.alunoId == undefined && body.nome != undefined && body.ra != undefined && body.login_FK != undefined){
        return {"nome": body.nome, "ra": body.ra, "login_FK": body.login_FK};
    }else if(body.alunoId != undefined && body.nome != undefined && body.ra != undefined && body.login_FK != undefined){
        return { "alunoId": body.alunoId, "nome": body.nome, "ra": body.ra, "login_FK": body.login_FK};
    }else if(body.alunoId == undefined && body.ra == undefined && body.nome == undefined && body.login_FK != undefined){
        return {"login_FK": body.login_FK}
    }else if(body.alunoId != undefined && body.ra == undefined && body.nome == undefined && body.login_FK == undefined){
        return {"alunoId": body.alunoId}
    }else{
        return {};
    }
}

// Helper para definir o objeto de salas da maneira esperada.
helper.toSala = function (body){
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

// Helper para definir o objeto de funcionário da maneira esperada.
helper.toFunc = function (body){
    if(body.funcionarioId == undefined && body.nome == undefined && body.funcional == undefined && body.login_FK == undefined){
        return {};
    }
    else if(body.funcionarioId == undefined && body.nome != undefined && body.funcional != undefined && body.login_FK != undefined){
        return { "nome": body.nome, "funcional": body.funcional, "login_FK": body.login_FK };
    }
    else if(body.funcionarioId != undefined && body.nome == undefined && body.funcional == undefined && body.login_FK == undefined){
        return { "funcionarioId": body.funcionarioId };
    }
    else if(body.funcionarioId == undefined && body.nome == undefined && body.funcional == undefined && body.login_FK != undefined){
        return { "login_FK": body.login_FK };
    }
    else if(body.funcionarioId != undefined && body.nome != undefined && body.funcional != undefined && body.login_FK != undefined){
        return { "funcionarioId": body.funcionarioId, "nome": body.nome, "funcional": body.funcional, "login_FK": body.login_FK };
    }
}

// Helper para definir o objeto de presenca (Aluno_TB_has_Aulas_TB) da maneira esperada.
helper.toPresenca = function (body){
    return { "alunoId_FK": body.alunoId_FK, "aulaId_FK": body.aulaId_FK, "presenca": body.presenca };
}

// Exportando módulo.
module.exports = helper;