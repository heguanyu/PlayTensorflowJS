const fs = require('fs')

let _cohorts = null;
function loadJson() {

}

function getCohort(devId) {
    if (!_cohorts) {
        loadJson();
    }
    return {}
}

function getCohorts() {
    if (!_cohorts) {
        loadJson();
    }
    return [{}]
}

export default {
    loadJson: loadJson,
    getCohort: getCohort,
    getCohorts: getCohorts
}