import logo from './logo.svg';
import './App.css';
import './PredictionWithTensorflowJS'
import {Component} from "react";
import PredictionWithTensorflowJS from "./PredictionWithTensorflowJS";
import ModelLoader from "./ModelLoader";
import CohortLoader from "./CohortLoader";

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
    console.log(event.target.value);
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
    this.indexInput = (<input type={"text"} onChange={this.updateTextValue.bind(this)}/>);
    this.button = (<input type={"button"} value={"Predict Score"} onClick={this.doCalculate.bind(this)}/>);
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {this.indexInput}
            {this.button}
            <div>Prediction score is: {this.state.score}</div>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
    );
  }

}

export default App;
