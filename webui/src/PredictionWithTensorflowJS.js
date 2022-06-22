import * as tfjs from "@tensorflow/tfjs"

export default class PredictionWithTensorflowJS {
    predict(model, featureNames, data) {
        const startTime = Date.now()
        // Prepare input tensors using feature names.
        let arr = new Array();
        for (let i = 0; i < featureNames.length; i++) {
            if (data.features.hasOwnProperty(featureNames[i]))
            {
                arr.push(data.features[featureNames[i]]);
            }
            else {
                arr.push(0.0);
            }
        }
        const inputTensor =  tfjs.tensor([arr]);
        // Run inference and get output tensors.
        let outputTensor = model.predict(inputTensor);
        const endTime = Date.now();
        return {
            //Rounding to 8 decimal places
            score: Math.round((outputTensor.dataSync()[0] + Number.EPSILON) * 100000000) / 100000000 ,
            time: endTime-startTime
        };
    }
}
