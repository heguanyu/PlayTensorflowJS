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
import './GroupMatching.css'

class GroupMatching extends Component{
  constructor(props) {
    super(props);

    this.predictionClient = new PredictionWithTensorflowJS()
    this.modelLoader = new ModelLoader()
    this.cohortLoader = new CohortLoader()
    this.benchmarkLoader = new BenchmarkLoader()

    this.state = {
      testResult: [],
      inputHashedIp: ""
    };
  }


  componentDidMount() {
  }

  doCalculate() {
    Promise.all([
      this.modelLoader.loadModel(),
      this.cohortLoader.getCohorts(this.state.inputHashedIp)
    ]).then(results => {
      const model = results[0].model;
      const featureNames = results[0].featureNames;
      const cohorts = results[1];
      const result = [];
      for(let i = 0; i < cohorts.length; i++) {
        const cohort = cohorts[i];
        const prediction = this.predictionClient.predict(model, featureNames, cohort);
        result.push({
          cohort: cohort,
          score: prediction.score,
          time: prediction.time,
        })
      }

      this.setState({
        testResult: result.sort((a,b)=>{return b.score-a.score})
      })
    })
  }
  updateTextValue(event) {
    this.setState({
      inputHashedIp: event.target.value
    })
  }

  renderTable() {
    const tbodyrows = [];
    for(let i = 0; i < (this.state.testResult || []).length; i++) {
      const result = this.state.testResult[i];
      const featureCount = Object.keys(result.cohort.features).length
      tbodyrows.push(<tr className={i==0?"highlight":""}>
        <td>{result.cohort.cohortId}</td>
        <td>{result.score}</td>
        <td>{result.time}</td>
        <td>{featureCount}</td>
      </tr>)
    }
    return (<div>
      <Table responsive={"sm"} style={{textAlign: "left", margin: "10px auto", width: "60%"}}>
        <thead>
        <tr>
          <th>Cohort ID</th>
          <th>Predicted Score</th>
          <th>Running time</th>
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
        <div className="GroupMatching">
            <TopNavigationBar></TopNavigationBar>
            <MemoryTracker></MemoryTracker>
            <div style={{marginTop: "20px"}}>
              Input Hashed IP
              <input style={{marginLeft: "7px"}} type={"text"} onChange={this.updateTextValue.bind(this)} placeholder={"Hased IP Address"}/>
              <Button style={{marginLeft: "20px"}}  onClick={this.doCalculate.bind(this)}>Predict score</Button>
            </div>
            {this.renderTable()}
        </div>
    );
  }

}

export default GroupMatching;
