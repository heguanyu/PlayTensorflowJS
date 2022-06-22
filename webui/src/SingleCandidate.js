import 'bootstrap/dist/css/bootstrap.min.css';
import './PredictionWithTensorflowJS'
import {format as prettyFormat} from 'pretty-format';
import {Component} from "react";
import PredictionWithTensorflowJS from "./PredictionWithTensorflowJS";
import ModelLoader from "./ModelLoader";
import CohortLoader from "./CohortLoader";
import TopNavigationBar from "./TopNavigationBar";
import MemoryTracker from "./MemoryTracker";
import BenchmarkLoader from "./BenchmarkLoader";

class SingleCandidate extends Component{
  constructor(props) {
    super(props);

    this.predictionClient = new PredictionWithTensorflowJS()
    this.modelLoader = new ModelLoader()
    this.cohortLoader = new CohortLoader()
    this.benchmarkLoader = new BenchmarkLoader()

    this.state = {
      warning: false,
      inputIndex: 0,
      score: 0,
      time: 0,
        benchmark: 0,
      cohort: {}
    };
  }


  componentDidMount() {
  }

  updateTextValue(event) {
    this.setState({
      inputIndex: event.target.value
    })
  }
  doCalculate() {
    let index = +(this.state.inputIndex || 0);
    if (this.state.inputIndex == "" || isNaN(+this.state.inputIndex) || +this.state.inputIndex<0 || +this.state.inputIndex >= 100) {
      this.setState({warning: true});
      return;
    }

    Promise.all([
        this.modelLoader.loadModel(),
        this.cohortLoader.getCohort(index),
        this.benchmarkLoader.getBenchmark(index)
    ]).then(results => {
      const model = results[0];
      const cohort = results[1];
      const benchmark = results[2];
      const prediction = this.predictionClient.predict(model ,cohort);
      this.setState({
        warning: false,
        cohort: cohort,
        score: prediction.score,
        benchmark: benchmark,
        time: prediction.time
      })
    })
  }

  render() {
    this.indexInput = (<input style={{marginLeft: "7px"}} type={"text"} onChange={this.updateTextValue.bind(this)}/>);
    this.button = (<input style={{marginLeft: "20px"}} type={"button"} value={"Predict Score"} onClick={this.doCalculate.bind(this)}/>);
    return (
        <div className="SingleCandidate">
            <TopNavigationBar></TopNavigationBar>
            <MemoryTracker></MemoryTracker>
            <div style={{marginTop: "20px"}}>
              Index of test_data
              {this.indexInput}
              {this.button}
              <span style={{display: this.state.warning? "inline": "none"}}>Must be a number 0-99</span>
            </div>
            <div style={{marginTop: "20px"}}>Prediction score is: {this.state.score}</div>
            <div style={{marginTop: "3px"}}>Expected score is: {this.state.benchmark}</div>
            <div style={{marginTop: "3px"}}>Time spent on prediction: {this.state.time}ms</div>
            <div style={{marginTop: "40px"}}>Cohort being tested</div>
            <textarea value={prettyFormat(this.state.cohort)} style={{width: "1300px", height: "800px"}} title={"Content"}></textarea>
        </div>
    );
  }

}

export default SingleCandidate;
