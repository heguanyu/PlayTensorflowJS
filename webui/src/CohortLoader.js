
export default class CohortLoader {
    async getCohorts() {
        // Fetch from the localhost:3000/fetch_cohorts
        const data = await fetch(`http://localhost:3009/fetch_cohorts`).then(response=>response.json())
        return data;
    }
    async getCohort(index) {
        // Fetch from the localhost:3000/fetch_cohort
        const data = await fetch(`http://localhost:3009/fetch_cohort?index=${index}`).then(response=>response.json())
        return data;
    }
}
