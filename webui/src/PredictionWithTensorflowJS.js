import tfjs from '@tensorflow/tfjs'

export default class PredictionWithTensorflowJS {
    predict(model, featureNames, features) {
        const startTime = Date.now()
        // TODO: Use TFJS to predict the model vs features

        const endTime = Date.now();
        return {
            score: 0.0,
            time: endTime-startTime
        };
    }
}
