const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');

const port = 3009
global.__basedir = __dirname;
const privateGroupCandidates = require('./private_group_candidates')
const modelMetadata = require('./model_metadata')
const pythonResults = require('./python_inferred_results')

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/get_model', (req, res) => {
    const modelsBasePath = "/resources/models/"
    const directoryPath = __basedir + modelsBasePath;
    const modelName = "native_tflite_model_from_mid_dummy_data_20220621.tflite"
    res.download(directoryPath + modelName, modelName, (err) => {
        if (err) {
          res.status(500).send({
            message: "Could not download the file. " + err,
          });
        }
      });
})

app.get('/fetch_model_metadata', (req, res) => {
    res.send(modelMetadata.getFeatures())
})

app.get('/fetch_cohort', (req, res) => {
  const index = req.query['index'];
  const result = privateGroupCandidates.getCohort(index);
  res.send(result);
})

app.get('/fetch_cohorts', (req, res) => {
    res.send(privateGroupCandidates.getCohorts())
});

app.get('/python_result', (req, res) => {
  const index = req.query['index'];
  const result = pythonResults.getPythonResult(index);
  res.send(result);
})

app.get('/python_results', (req, res) => {
  res.send(pythonResults.getPythonResults());
})

module.exports = app;