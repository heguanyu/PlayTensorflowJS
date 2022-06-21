// import * as tfjs from '@tensorflow/tfjs'
import * as tflite from '@tensorflow/tfjs-tflite'

const modelEndPoint = `http://localhost:3009/get_model`

export default class ModelLoader {
    async loadModel() {
        tflite.setWasmPath(
            'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite@0.0.1-alpha.8/dist/'
         );
        const model = await tflite.loadTFLiteModel(modelEndPoint);
        console.log(model)
        return model;
    }
}
