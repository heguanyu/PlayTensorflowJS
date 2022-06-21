import logo from './logo.svg';
import './App.css';
import './PredictionWithTensorflowJS'
import PredictionWithTensorflowJS from "./PredictionWithTensorflowJS";
import ModelLoader from "./ModelLoader";
import CohortLoader from "./CohortLoader";

function App() {
  const predictionClient = new PredictionWithTensorflowJS()
  const modelLoader = new ModelLoader()
  const cohortLoader = new CohortLoader()

  const model = modelLoader.loadModel()
  const cohort = cohortLoader.getCohort("abc")

  const score = predictionClient.getScore(model, cohort)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>Prediction score is: {score}</div>
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

export default App;
