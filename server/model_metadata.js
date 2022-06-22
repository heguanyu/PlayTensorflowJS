const fs = require('fs')
const _ = require('lodash')

let _features = null;
let _lock = false;

function loadJson() {
    if (_lock) {
        return false;
    }
    _lock = true;
    const file = fs.readFileSync('./resources/data/list_of_features.json');
    _features =  JSON.parse(file).features;
    _lock = false;
    return true;
}

function getFeatures() {
    while(!_features) {
        loadJson()
    }
    return _features;
}

module.exports =  {
    getFeatures: getFeatures
}