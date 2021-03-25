/* src/App.js */
import React from 'react';
import Amplify from 'aws-amplify';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import awsExports from './aws-exports';
import Quiz from './components/Quiz';
import CocktailForm from './components/Form';

Amplify.configure(awsExports);

function App() {
	return (
		<Router>
			<div className='App'>
				<nav className='header-nav'>
					<ul>
						<li>
							<Link to='/quiz'>Cocktail Quiz</Link>
						</li>
						<li>
							<Link to='/cocktailform'>Add Cocktails</Link>
						</li>
						<li className='amp-sign-out-button'>
							<AmplifySignOut />
						</li>
					</ul>
				</nav>

				<Switch>
					<Route path='/quiz'>
						<Quiz />
					</Route>
					<Route path='/cocktailform'>
						<CocktailForm />
					</Route>
					<Route path='/'>
						<Quiz />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default withAuthenticator(App, { includeGreetings: true });
