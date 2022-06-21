
export default class CohortLoader {
    getCohorts() {
        // Fetch from the localhost:3000/fetch_cohorts
        return [{}];
    }
    async getCohort(index) {
        // Fetch from the localhost:3000/fetch_cohort
        const data = await fetch(`http://localhost:3009/fetch_cohort?index=${index}`).then(response=>response.json())
        return data;
    }
}
