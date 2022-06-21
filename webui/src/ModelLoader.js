// import * as tfjs from '@tensorflow/tfjs'
import * as tflite from '@tensorflow/tfjs-tflite'

const modelEndPoint = `http://localhost:3009/get_model`

export default class ModelLoader {
    async loadModel() {
        const model = await tflite.loadTFLiteModel(modelEndPoint);
        console.log(model)
        return model;
    }
}
