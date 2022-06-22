
export default class BenchmarkLoader {
    async getBenchmarks() {
        // Fetch from the localhost:3000/fetch_cohorts
        const data = await fetch(`http://localhost:3009/python_results`).then(response=>response.json())
        return data;
    }
    async getBenchmark(index) {
        // Fetch from the localhost:3000/fetch_cohort
        const data = await fetch(`http://localhost:3009/python_result?index=${index}`).then(response=>response.json())
        return data;
    }
}
