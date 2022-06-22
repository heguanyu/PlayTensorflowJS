// import * as tfjs from '@tensorflow/tfjs'
import * as tflite from '@tensorflow/tfjs-tflite'

const modelEndPoint = `http://localhost:3009/get_model`

export default class ModelLoader {
    constructor() {
        this.model = null;
        this.featureNames = null;
    }
    async loadModel() {
        if(!this.featureNames) {
            this.featureNames = await fetch(`http://localhost:3009/fetch_model_metadata`).then(response=>response.json())
        }
        if(!this.model) {
            tflite.setWasmPath(
                'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite@0.0.1-alpha.8/dist/'
            );
            this.model = await tflite.loadTFLiteModel(modelEndPoint);
        }
        return {
            model : this.model, 
            featureNames: this.featureNames
        };
    }
}
