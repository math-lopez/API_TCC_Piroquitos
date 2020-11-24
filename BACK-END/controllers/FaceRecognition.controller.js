// Importações.
const db = require("../services/database.service");
var path = require("path");
const FaceRecognitionService = require("../services/FaceRecognition.service");

// Declaração do módulo que será exportado.
let controller = {};

// Método para iniciar cálculo de presença com reconhecimento facial.
controller.initCalcPresenca = async function (aulaId) {
    const conn = await db.conn();
    const query = `SELECT * FROM Aluno_TB_has_Aulas_TB WHERE aulaId_FK='${aulaId}';`;

    db.select(conn, query)
        .then((result) => {
            if(!result.length){
                console.log("Não há matrículas nesta aula.");
            }
            else{
                console.log("Matrículas na aula listadas com sucesso.");
                getAlunosWithRA(result);
            }
        })
        .catch((err) => {
            console.log("Houve um erro na consulta matrículas por aula: " + err);
        });
}

async function getAlunosWithRA(list_alunosId){
    list_alunosId.forEach(async (e) => {
        const conn = await db.conn();
        const query = `SELECT * FROM Aluno_TB WHERE alunoId='${e.alunoId_FK}';`;

        db.select(conn, query)
            .then((result) => {
                if(!result.length){
                    console.log("Aluno não encontrado.");
                }
                else{
                    console.log("Aluno encontrado com sucesso.");
                    let alunoWithRA = {"aulaId": e.aulaId_FK, "ra": result[0].RA, "alunoId": result[0].alunoId};
                    callFaceRecognition(alunoWithRA);
                }
            })
            .catch((err) => {
                console.log("Houve um erro na consulta de aluno: " + err)
            });

    });
}

async function callFaceRecognition(alunoWithRA){
    const faceRecognitionService = new FaceRecognitionService();

    let pathAula = getPathAula(alunoWithRA.aulaId);
    let pathAluno = getPathAluno(alunoWithRA.ra);

    retorno = await faceRecognitionService.faceRecognize(pathAluno, pathAula);

    setPresenca(alunoWithRA, retorno.isPresente);
}

function getPathAula(aulaId){
    return path.join(__dirname, "..", "photos", "AULAS", `presenca_${aulaId}.jpg`);
}

function getPathAluno(ra){
    return path.join(__dirname, "..", "photos", ra, `cad_${ra}.jpg`);
}

async function setPresenca(alunoWithRA, isPresente){
    const conn = await db.conn();
    const query = "UPDATE Aluno_TB_has_Aulas_TB SET presenca=? WHERE alunoId_FK=? AND aulaId_FK=?;";
    const dadosPresenca = [isPresente, alunoWithRA.alunoId, alunoWithRA.aulaId];

    db.execute(conn, query, dadosPresenca)
        .then((result) => {
            if(result.affectedRows > 0){
                console.log("Edição de presença realizada com sucesso.");
            }
            else{
                console.log("A matrícula informada não existe para alteração.");
            }
        })
        .catch((err) => {
            console.log("Houve um erro na edição de presença: " + err);
        });
}

// Exportação do módulo.
module.exports = controller;