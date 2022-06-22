import 'bootstrap/dist/css/bootstrap.min.css';
import './PredictionWithTensorflowJS'
import {format as prettyFormat} from 'pretty-format';
import {Component} from "react";
import PredictionWithTensorflowJS from "./PredictionWithTensorflowJS";
import ModelLoader from "./ModelLoader";
import CohortLoader from "./CohortLoader";
import TopNavigationBar from "./TopNavigationBar";
import MemoryTracker from "./MemoryTracker";
import {Table} from "react-bootstrap";

class AllCandidates extends Component{
  constructor(props) {
    super(props);

    this.predictionClient = new PredictionWithTensorflowJS()
    this.modelLoader = new ModelLoader()
    this.cohortLoader = new CohortLoader()

    this.state = {
      testResult: []
    };
  }


  componentDidMount() {
  }

  doCalculate() {

    Promise.all([
      this.modelLoader.loadModel(),
      this.cohortLoader.getCohorts()
    ]).then(results => {
      const model = results[0];
      const cohorts = results[1];
      const result = [];
      for(let i = 0; i < cohorts.length; i++) {
        const cohort = cohorts[i];
        const prediction = this.predictionClient.predict(model, cohort);
        result.push({
          cohort: cohort,
          score: prediction.score,
          time: prediction.time
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
        <td>{result.time}</td>
        <td>{result.cohort.ip}</td>
        <td>{featureCount}</td>
      </tr>)
    }
    return (<div>
      <Table responsive={"sm"} style={{textAlign: "left", margin: "10px auto", width: "60%"}}>
        <thead>
        <tr>
          <th>Index</th>
          <th>Predicted Score</th>
          <th>Running time</th>
          <th>Hashed IP</th>
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
    this.button = (<input style={{marginLeft: "20px"}} type={"button"} value={"Predict Scores"} onClick={this.doCalculate.bind(this)}/>);
    return (
        <div className="AllCandidates">
            <TopNavigationBar></TopNavigationBar>
            <MemoryTracker></MemoryTracker>
            <div style={{marginTop: "20px"}}>
              Running on all records in test_data
              {this.button}
            </div>
            {this.renderTable()}
        </div>
    );
  }

}

export default AllCandidates;
