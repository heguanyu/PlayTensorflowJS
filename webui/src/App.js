import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './PredictionWithTensorflowJS'
import React from "react";
import {HashRouter, Route, Redirect, Switch, BrowserRouter} from 'react-router-dom';
import SingleCandidate from "./SingleCandidate";
import AllCandidates from "./AllCandidates";

class App extends React.Component {
  componentDidMount() {
    // window.location.reload();
  }

  render() {
    const theswitch = (<Switch>
        <Redirect path="/" exact to="/singlecandidate" />
      <Route path="/allcandidates" exact component={AllCandidates} />
      <Route path="/singlecandidate" exact component={SingleCandidate} />
    </Switch>)
    if (window.location.origin.indexOf(".github.io") > 0) {
      return (
          <div className="App">
            <HashRouter hashType={"noslash"} >
              {theswitch}
            </HashRouter>
          </div>
      );
    }
    else {
      return (
          <div className="App">
            <BrowserRouter >
              {theswitch}
            </BrowserRouter>
          </div>
      );
    }

  }
}

export default App;
