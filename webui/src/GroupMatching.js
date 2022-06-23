import 'bootstrap/dist/css/bootstrap.min.css';
import './PredictionWithTensorflowJS'
import Select from 'react-select'
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
    const allowedHashedIps = [
      '003b24627654118ae4acb8b0634d58d027f98c96bea977773e8b2d7b8d8900e101',
      '00a281498357d91d2d8e62c8b72eb82d77c6311805790a2d912da616b2960d4901',
      '00d94a07a0dcecbab02b37a4d840c9996b902aae84de0c797bee280338a74af001',
      '00f4a88626cde46b077103d9cb4fa78345ba60eac012d126bf5994b5e5d5c6c301',
      '01084095f2deda9083bdd3df658ffeae02727c1d31c6cb092520f3d9e265020601',
      '0151966f3c1f29f05e25ec972a547dc7f976a40144a6f808b2f8c21d25ea322e01',
      '01b7bc8d4ae4f796729b185fc54a82365131ba49f462e0ef9da8c73ce53a8beb01'
    ]
    this.ipOptions = allowedHashedIps.map(ip => {
      return {
        value: ip,
        label: ip
      }
    })

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
  handleSelectVersion(selectedOption) {
    this.setState({
      "inputHashedIp": selectedOption.value
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
        <div className="GroupMatching">
            <TopNavigationBar></TopNavigationBar>
            <MemoryTracker></MemoryTracker>
            <div style={{marginTop: "20px"}}>
              Input Hashed IP
              <div style={{display: "inline-block", width: "700px", margin: "0 5px"}} >
                <Select options={this.ipOptions} onChange={this.handleSelectVersion.bind(this)}></Select>
              </div>

              <Button style={{marginLeft: "20px"}}  onClick={this.doCalculate.bind(this)}>Predict score</Button>
            </div>
            {this.renderTable()}
        </div>
    );
  }

}

export default GroupMatching;
