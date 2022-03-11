/* src/App.js */
import React, { useState } from "react";
import Amplify from "aws-amplify";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import awsExports from "./aws-exports";
import Quiz from "./components/Quiz";
import CocktailForm from "./components/Form";
import Loader from "./components/Loader";
import About from "./components/Anthony";

Amplify.configure(awsExports);

const App = () => {
  const [displayLoader, changeLoader] = useState(false);

  const handleLoaderUpdate = (display, message) => {
    changeLoader(display, message);
  };

  return (
    <div>
      <Router>
        <div className="App">
          <nav className="header-nav">
            <ul>
              <li>
                <Link to="/">BIO</Link>
              </li>
              <li>
                <Link to="/quiz">COCKTAIL QUIZ</Link>
              </li>
              <li>
                <Link to="/cocktailform">ADD COCKTAILS</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/quiz">
              <Quiz onLoaderUpdate={handleLoaderUpdate} />
            </Route>
            <Route path="/cocktailform">
              <CocktailForm onLoaderUpdate={handleLoaderUpdate} />
            </Route>
            <Route path="/">
              <About />
            </Route>
          </Switch>
        </div>
      </Router>

      {displayLoader && <Loader />}
    </div>
  );
};

export default App;
