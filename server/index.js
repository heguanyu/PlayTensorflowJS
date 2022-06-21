const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');

const port = 3009
const privateGroupCandidates = require('./private_group_candidates')


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
    res.send('Trying to get model\n')
})

app.get('/fetch_cohort', (req, res) => {
    const index = req.query['index'];
    const result = privateGroupCandidates.getCohort(index);
    console.log(result);
    res.send(result);
})

app.get('/fetch_cohorts', (req, res) => {
    res.send(privateGroupCandidates.getCohorts())
});

module.exports = app;