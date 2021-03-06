import 'bootstrap/dist/css/bootstrap.min.css';
import './PredictionWithTensorflowJS'
import {format as prettyFormat} from 'pretty-format';
import {Component} from "react";
import PredictionWithTensorflowJS from "./PredictionWithTensorflowJS";
import ModelLoader from "./ModelLoader";
import CohortLoader from "./CohortLoader";
import TopNavigationBar from "./TopNavigationBar";
import MemoryTracker from "./MemoryTracker";
import {Button, Table} from "react-bootstrap";
import BenchmarkLoader from "./BenchmarkLoader";

class AllCandidates extends Component{
  constructor(props) {
    super(props);

    this.predictionClient = new PredictionWithTensorflowJS()
    this.modelLoader = new ModelLoader()
    this.cohortLoader = new CohortLoader()
    this.benchmarkLoader = new BenchmarkLoader()

    this.state = {
      testResult: []
    };
  }


  componentDidMount() {
  }

  doCalculate() {

    Promise.all([
      this.modelLoader.loadModel(),
      this.cohortLoader.getCohorts(),
        this.benchmarkLoader.getBenchmarks()
    ]).then(results => {
      const model = results[0].model;
      const featureNames = results[0].featureNames;
      const cohorts = results[1];
      const benchmarks = results[2];
      const result = [];
      for(let i = 0; i < cohorts.length; i++) {
        const cohort = cohorts[i];
        const benchmark = benchmarks[i]
        const prediction = this.predictionClient.predict(model, featureNames, cohort);
        result.push({
          cohort: cohort,
          score: prediction.score,
          time: prediction.time,
          benchmark: benchmark
        })
      }

      this.setState({
        testResult: result
      })
    })
  }

  renderTable() {
    const tbodyrows = [];
    for(let i = 0; i < (this.state.testResult || []).length; i++) {
      const result = this.state.testResult[i];
      const featureCount = Object.keys(result.cohort.features).length
      tbodyrows.push(<tr>
        <td>{i}</td>
        <td>{result.score}</td>
        <td>{result.benchmark}</td>
        <td>{Math.abs(result.benchmark-result.score)}</td>
        <td>{result.time}</td>
        <td>{featureCount}</td>
      </tr>)
    }
    return (<div>
      <Table responsive={"sm"} style={{textAlign: "left", margin: "10px auto", width: "60%"}}>
        <thead>
        <tr>
          <th>Index</th>
          <th>Predicted Score</th>
          <th>Expected Score</th>
          <th>Difference</th>
          <th>Running time (ms)</th>
          <th>Feature Count</th>
        </tr>
        </thead>
        <tbody>
        {tbodyrows}
        </tbody>
      </Table>
    </div>)
  }

  render() {
    return (
        <div className="AllCandidates">
            <TopNavigationBar></TopNavigationBar>
            <MemoryTracker></MemoryTracker>
            <div style={{marginTop: "20px"}}>
              Running on all records in test_data
              <Button style={{marginLeft: "20px"}}  onClick={this.doCalculate.bind(this)}>Predict score</Button>
            </div>
            {this.renderTable()}
        </div>
    );
  }

}

export default AllCandidates;
