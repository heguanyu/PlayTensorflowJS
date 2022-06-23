
export default class CohortLoader {
    async getCohorts(ip) {
        // Fetch from the localhost:3000/fetch_cohorts
        if (ip) {
            return await fetch(`http://localhost:3009/fetch_cohorts?ip=${ip}`).then(response=>response.json())
        }
        else {
            return await fetch(`http://localhost:3009/fetch_cohorts`).then(response=>response.json())
        }
    }
    async getCohort(index) {
        // Fetch from the localhost:3000/fetch_cohort
        return await fetch(`http://localhost:3009/fetch_cohort?index=${index}`).then(response=>response.json())
    }
}
