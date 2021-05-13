import React, { useEffect, useState } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createCocktail } from '../graphql/mutations';
import Ingredients from './Ingredients';
import { withAuthenticator } from '@aws-amplify/ui-react';

const CocktailForm = ({ onLoaderUpdate }) => {
	const [ingredientInputs, changeIngredientInput] = useState([
		{ quantity: '', measurement: '', name: '' },
	]);
	const [cocktailName, setCocktailName] = useState('');
	const [currentUsername, setCurrentUsername] = useState('');
	const [addCocktailMessage, setCocktailMessage] = useState('');

	const handleUpdateInputValues = (e, i) => {
		const type = e.target.getAttribute('data-type');
		const { value } = e.target;

		let inputs = [...ingredientInputs];
		let input = inputs[i];

		input[type] = value;
		inputs[i] = input;
		changeIngredientInput(inputs);
	};

	const addIngredientInput = (e) => {
		e.preventDefault();
		changeIngredientInput([
			...ingredientInputs,
			{ quantity: '', measurement: '', name: '' },
		]);
	};

	const getUser = () => {
		return Auth.currentAuthenticatedUser()
			.then((userData) => userData)
			.catch(() => console.log('Not signed in'));
	};

	const setInput = (value) => {
		setCocktailName(value);
	};

	async function addCocktail(e) {
		e.preventDefault();
		onLoaderUpdate(true);
		try {
			if (!cocktailName || !currentUsername) return;
			const recipeStrings = ingredientInputs.map((recipe) => {
				const { quantity, measurement, name } = recipe;
				const recipeString = quantity + ' ' + measurement + ' ' + name;
				return recipeString.toLowerCase();
			});

			const cocktailPayload = {
				name: cocktailName,
				recipe: recipeStrings,
				username: currentUsername,
			};

			await API.graphql(
				graphqlOperation(createCocktail, { input: cocktailPayload })
			);

			setCocktailMessage(
				'Your cocktail ' + cocktailName + ' has been added to the quiz!'
			);
			setCocktailName('');
			changeIngredientInput([{ quantity: '', measurement: '', name: '' }]);
		} catch (err) {
			console.log('error creating cocktail:', err);
			setCocktailMessage('There was an error creating your cocktail.');
		}
		onLoaderUpdate(false);
	}

	const renderAddCocktailMessage = () => {
		if (addCocktailMessage) {
			return <span class='add-cocktail-message'>{addCocktailMessage}</span>;
		}
	};

	useEffect(() => {
		getUser().then((userData) => setCurrentUsername(userData.username));
	}, []);

	return (
		<div>
			{renderAddCocktailMessage()}
			<h2>Add a Cocktail</h2>
			<div className='add-form-container'>
				<input
					onChange={(event) => setInput(event.target.value)}
					value={cocktailName}
					placeholder='Cocktail name'
					className='cocktail-name-input'
				/>
				<div className='ingredients-container'>
					<p className='ingredients-title'>Ingredients</p>
					<div className='ingredients-list-container'>
						{ingredientInputs.map((ingredient, idx) => (
							<Ingredients
								key={idx}
								ingredient={ingredient}
								onUpdateInputValues={handleUpdateInputValues}
								idx={idx}
							/>
						))}
					</div>
					<button onClick={addIngredientInput}>+</button>
				</div>
				<button onClick={addCocktail} className='quiz-submit'>
					Submit
				</button>
			</div>
		</div>
	);
};

export default withAuthenticator(CocktailForm, { includeGreetings: true });
