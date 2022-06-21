const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/get_model', (req, res) => {
    res.send('Trying to get model\n')
})

app.get('/fetch_cohort', (req, res) => {
    res.send('Trying to get cohort\n')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})