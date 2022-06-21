import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './PredictionWithTensorflowJS'
import {Component} from "react";
import PredictionWithTensorflowJS from "./PredictionWithTensorflowJS";
import ModelLoader from "./ModelLoader";
import CohortLoader from "./CohortLoader";
import TopNavigationBar from "./TopNavigationBar";

class App extends Component{
  constructor(props) {
    super(props);

    this.predictionClient = new PredictionWithTensorflowJS()
    this.modelLoader = new ModelLoader()
    this.cohortLoader = new CohortLoader()

    this.state = {
      inputIndex: 0,
      score: 0
    };
  }


  componentDidMount() {
    this.doCalculate();
  }

  updateTextValue(event) {
    this.setState({
      inputIndex: event.target.value
    })
  }
  doCalculate() {
    let index = +(this.state.inputIndex || 0);

    Promise.all([
      this.modelLoader.loadModel(),
      this.cohortLoader.getCohort(index),
      this.cohortLoader.getCohorts()
    ]).then(results => {
      const model = results[0];
      const cohort = results[1];
      const cohorts = results[2];
      const score = this.predictionClient.getScore(model ,cohort);
      this.setState({
        score: score
      })
    })
  }

  render() {
    this.indexInput = (<input style={{marginLeft: "7px"}} type={"text"} onChange={this.updateTextValue.bind(this)}/>);
    this.button = (<input style={{marginLeft: "20px"}} type={"button"} value={"Predict Score"} onClick={this.doCalculate.bind(this)}/>);
    return (
        <div className="App">
            <TopNavigationBar></TopNavigationBar>
            <div style={{marginTop: "20px"}}>
              Index of test_data
              {this.indexInput}
              {this.button}
            </div>
            <div style={{marginTop: "40px"}}>Prediction score is: {this.state.score}</div>
        </div>
    );
  }

}

export default App;
