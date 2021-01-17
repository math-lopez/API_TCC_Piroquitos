// Definindo a saída para alguns logs desnecessário como nulo.
process.stderr.write = null;

// Importações.
const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs-node');
const faceapi = require('@vladmandic/face-api');

// Declaração de constantes.
const CAMINHO_RELATIVO_MODELO_IA = './model';
const SCORE_MIN_CONFIANCA = 0.2;    // Padrão é 0.5.

// Helper para auxiliar na exibição de logs do Face API.
function str (json) {
    const text = json ? JSON.stringify(json).replace(/{|}|"|\[|\]/g, '').replace(/,/g, ', ') : '';
    return text;
}

// Helper para auxiliar nos logs.
function log (...txt) {
    console.log(...txt);
}

// Helper para carregar e devolver a imagem.
async function getImage(img) {
    const buffer = fs.readFileSync(img);
    const decoded = tf.node.decodeImage(buffer);
    const casted = decoded.toFloat();
    const result = casted.expandDims(0);
    
    decoded.dispose();
    casted.dispose();
    
    return result;
}

async function faceRecognize(img_ref, img_query) {
    // Declaração de objeto de retorno da função.
    var retorno = { isPresente: false, msg: "ERRO - Objeto de retorno com valor padrão." };

    // Configuração do Back-End do Face API.
    // log('Configurando Back-End do Face-API...');
    await faceapi.tf.enableProdMode();
    await faceapi.tf.ENV.set('DEBUG', false);
    await faceapi.tf.ready();
    
    // // Logs de versão, ambiente e flags.
    // log(`Versões e ambiente: TensorFlow/JS ${str(faceapi.tf?.version_core || '(not loaded)')} FaceAPI ${str(faceapi?.version || '(not loaded)')} Backend: ${str(faceapi.tf?.getBackend() || '(not loaded)')}`);
    // log(`Flags: ${JSON.stringify(faceapi.tf.ENV.flags)}`);

    // Carregando os shards e manifest.json do modelo de dados da I.A.
    // log('Loading models...');
    const CAMINHO_COMPLETO_MODELO_IA = path.join(__dirname, CAMINHO_RELATIVO_MODELO_IA);
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(CAMINHO_COMPLETO_MODELO_IA);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(CAMINHO_COMPLETO_MODELO_IA);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(CAMINHO_COMPLETO_MODELO_IA);
    const optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({ minConfidence: SCORE_MIN_CONFIANCA });

    // // Checando estado do motor do TensorFlow.
    // const engine = await faceapi.tf.engine();
    // log(`Estado do Motor do TF: ${str(engine.state)}`);

    // Definindo constante com o caminho das imagens.
    const CAMINHO_IMG_REF = path.join(__dirname, img_ref);
    const CAMINHO_IMG_QUERY = path.join(__dirname, img_query);
    
    // TRABALHANDO IMAGEM DE REFERÊNCIA.
    // Carregando imagem de referência.
    const tensor_reference = await getImage(CAMINHO_IMG_REF);
    // Detecção e marcação facial da imagem de referência.
    const result_reference = await faceapi.detectAllFaces(tensor_reference, optionsSSDMobileNet)
        .withFaceLandmarks()
        .withFaceDescriptors();
    // // Resultado da detecção facial.
    // log('Imagem: ', img_ref,' - Faces Detectadas:', result_reference.length);
    // Finalizando tensor.
    tensor_reference.dispose();
    // Checando se há faces detectadas na imagem de referência.
    if (!result_reference.length) {
        console.log("Houve um erro no reconhecimento facial.\nNão há rostos detectáveis na imagem de referência.");
        return { isPresente: false, msg: "Não há rostos detectáveis na imagem de referência." };
    }

    // TRABALHANDO IMAGEM DE BUSCA.
    // Carregando imagem de busca.
    const tensor_query = await getImage(CAMINHO_IMG_QUERY);
    // Detecção e marcação facial da imagem de busca.
    const result_query = await faceapi.detectAllFaces(tensor_query, optionsSSDMobileNet)
        .withFaceLandmarks()
        .withFaceDescriptors();
    // // Resultado da detecção facial.
    // log('Imagem: ', img_query,' - Faces Detectadas:', result_query.length);
    // Finalizando tensor.
    tensor_query.dispose();
    // Checando se há faces detectadas na imagem de busca.
    if (!result_query.length) {
        console.log("Houve um erro no reconhecimento facial.\nNão há rostos detectáveis na imagem de busca.");
        return { isPresente: false, msg: "Não há rostos detectáveis na imagem de busca." };
    }

    // EXECUTANDO RECONHECIMENTO FACIAL.
    // Instanciando objeto do tipo FaceMatcher (que executará reconhecimento facial) com o resultado da imagem de referência.
    const faceMatcher = new faceapi.FaceMatcher(result_reference);

    // Para cada face encontrada na imagem de busca
    result_query.forEach(fd => {
        const bestMatch = faceMatcher.findBestMatch(fd.descriptor);

        if(bestMatch.label!="unknown"){
            // console.log(bestMatch.label);
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

async function main(){
    // retornoReconhecimentoFacial = await faceRecognize("./MATHEUS.jpg", "./MATHEUS_2.jpg");
    // retornoReconhecimentoFacial = await faceRecognize("./MATHEUS.jpg", "./LUCCA.jpg");
    retornoReconhecimentoFacial = await faceRecognize("./LUCCA.jpg", "./LUCCA_2.jpg");
    console.log(retornoReconhecimentoFacial);
}

main();