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
    this.state = {
      score: 0
    };
  }


  componentDidMount() {

    const predictionClient = new PredictionWithTensorflowJS()
    const modelLoader = new ModelLoader()
    const cohortLoader = new CohortLoader()

    Promise.all([
      modelLoader.loadModel(),
      cohortLoader.getCohort(0),
      cohortLoader.getCohorts()
    ]).then(results => {
      const model = results[0];
      const cohort = results[1];
      const cohorts = results[1];
      console.log(cohorts[2]);
      const score = predictionClient.getScore(model ,cohort);
      this.setState({
        score: score
      })
    })
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
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
