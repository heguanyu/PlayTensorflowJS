const fs = require('fs')
const _ = require('lodash')

let _python_results = null;
let _lock = false;

function loadJson() {
    if (_lock) {
        return false;
    }
    _lock = true;
    const file = fs.readFileSync('./../pythonbenchmark/python-inferred-results.json');
    _python_results =  JSON.parse(file);
    _lock = false;
    return true;
}

function getPythonResult(index) {
    while(!_python_results) {
        loadJson()
    }
    return _python_results[index]
}

function getPythonResults() {
    while(!_python_results) {
        loadJson()
    }
    return _python_results;
}

module.exports =  {
    getPythonResult: getPythonResult,
    getPythonResults: getPythonResults
}