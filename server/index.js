const express = require('express')
const app = express()
const port = 3009
const privateGroupCandidates = require('./private_group_candidates')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/get_model', (req, res) => {
    res.send('Trying to get model\n')
})

app.get('/fetch_cohort', (req, res) => {
    const devId = req.params('devid');
    res.send(privateGroupCandidates.getCohort(devId))
})

app.get('/fetch_cohorts', (req, res) => {
    res.send(privateGroupCandidates.getCohorts())
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})