/* src/App.js */
import React from 'react'
import Amplify from 'aws-amplify'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'


import awsExports from "./aws-exports";
import Quiz from './components/Quiz';

Amplify.configure(awsExports);


function App() {
  return (
    <Router>
    <div className="App">
      <nav className="header-nav">
        <ul>
          <li>
            <Link to="/quiz">Cocktail Quiz</Link>
          </li>
          <li>
            <AmplifySignOut />
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/quiz">
          <Quiz />
        </Route>
        <Route path="/">
          <Quiz />
        </Route>
      </Switch>
    </div>
  </Router>

  );
}

export default withAuthenticator(App, { includeGreetings: true })