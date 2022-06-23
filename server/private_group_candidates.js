const fs = require('fs')
const _ = require('lodash')

let _cohorts = null;
let _lock = false;

function loadJson() {
    if (_lock) {
        return false;
    }
    _lock = true;
    const file = fs.readFileSync('./test_data.json');
    _cohorts =  JSON.parse(file);
    _lock = false;
    return true;
}

function getCohort(index) {
    while(!_cohorts) {
        loadJson()
    }
    return _cohorts[+index]
}

function getCohorts(ip) {
    while(!_cohorts) {
        loadJson()
    }
    if (ip) {
        // filter by ip
        return _.filter(_cohorts, cohort=> {
            return cohort.ip == ip
        })
    }
    else {
        return _cohorts;
    }

}

module.exports =  {
    getCohort: getCohort,
    getCohorts: getCohorts
}