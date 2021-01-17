// Definindo a saída para alguns logs desnecessário como nulo.
process.stderr.write = null;

// Importações.
const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs-node');
const faceapi = require('@vladmandic/face-api');

// Declaração de constantes.
const CAMINHO_RELATIVO_MODELO_IA = '../model';
const SCORE_MIN_CONFIANCA = 0.5;    // Padrão é 0.5.

class FaceRecognitionService {
    // Helper para auxiliar nos logs.
    log (...txt) {
        console.log(...txt);
    }

    // Helper para carregar e devolver a imagem.
    async getImage(img) {
        const buffer = fs.readFileSync(img);
        const decoded = tf.node.decodeImage(buffer);
        const casted = decoded.toFloat();
        const result = casted.expandDims(0);
        
        decoded.dispose();
        casted.dispose();
        
        return result;
    }

    // Método que executa o reconhecimento facial com Face-API.
    async faceRecognize(img_ref, img_query) {
        var retorno = { isPresente: false, msg: "ERRO - Objeto de retorno com valor padrão." };
    
        await faceapi.tf.enableProdMode();
        await faceapi.tf.ENV.set('DEBUG', false);
        await faceapi.tf.ready();
        
        const CAMINHO_COMPLETO_MODELO_IA = path.join(__dirname, CAMINHO_RELATIVO_MODELO_IA);
        await faceapi.nets.ssdMobilenetv1.loadFromDisk(CAMINHO_COMPLETO_MODELO_IA);
        await faceapi.nets.faceLandmark68Net.loadFromDisk(CAMINHO_COMPLETO_MODELO_IA);
        await faceapi.nets.faceRecognitionNet.loadFromDisk(CAMINHO_COMPLETO_MODELO_IA);
        const optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({ minConfidence: SCORE_MIN_CONFIANCA });
    
        const CAMINHO_IMG_REF = img_ref;
        const CAMINHO_IMG_QUERY = img_query;

        if(!fs.existsSync(CAMINHO_IMG_REF)){
            return { isPresente: false, msg: "A imagem de referência não foi encontrada." };
        }

        const tensor_reference = await this.getImage(CAMINHO_IMG_REF);
        const result_reference = await faceapi.detectAllFaces(tensor_reference, optionsSSDMobileNet)
            .withFaceLandmarks()
            .withFaceDescriptors();
        // this.log('Imagem: ', img_ref,' - Faces Detectadas:', result_reference.length);
        tensor_reference.dispose();
        if (!result_reference.length) {
            console.log("Houve um erro no reconhecimento facial.\nNão há rostos detectáveis na imagem de referência.");
            return { isPresente: false, msg: "Não há rostos detectáveis na imagem de referência." };
        }

        if(!fs.existsSync(CAMINHO_IMG_QUERY)){
            return { isPresente: false, msg: "A imagem de busca não foi encontrada." };
        }

        const tensor_query = await this.getImage(CAMINHO_IMG_QUERY);
        const result_query = await faceapi.detectAllFaces(tensor_query, optionsSSDMobileNet)
            .withFaceLandmarks()
            .withFaceDescriptors();
        // this.log('Imagem: ', img_query,' - Faces Detectadas:', result_query.length);
        tensor_query.dispose();
        if (!result_query.length) {
            console.log("Houve um erro no reconhecimento facial.\nNão há rostos detectáveis na imagem de busca.");
            return { isPresente: false, msg: "Não há rostos detectáveis na imagem de busca." };
        }
    
        const faceMatcher = new faceapi.FaceMatcher(result_reference);
        result_query.forEach(fd => {
            const bestMatch = faceMatcher.findBestMatch(fd.descriptor);
    
            if(bestMatch.label!="unknown"){
                retorno.isPresente = true;
                retorno.msg = "Aluno está presente na sala.";
            }
        });
    
        if(retorno.msg=="ERRO - Objeto de retorno com valor padrão."){
            retorno.msg = "Aluno não presente na foto de busca.";
        }
    
        console.log("Reconhecimento Facial executado com sucesso.");
        return retorno;
    }    
}

module.exports = FaceRecognitionService;