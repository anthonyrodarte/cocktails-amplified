import React, { useState, useEffect } from 'react';
import { first, shuffle, drop, intersection } from 'lodash';
import { API, graphqlOperation } from 'aws-amplify';

import Ingredients from './Ingredients';
import { listCocktails } from '../graphql/queries';

const Quiz = () => {
	const [cocktailList, changeCocktailList] = useState({
		name: '',
		recipe: [''],
	});
	const [ingredientInputs, changeIngredientInput] = useState([
		{ quantity: '', measurement: '', name: '' },
	]);
	const [quizScore, updateQuizScore] = useState({
		score: 0,
		incorrectList: [],
	});

	let cocktailName;
	let cocktailRecipe;

	if (cocktailList.length >= 1) {
		const { name, recipe } = first(cocktailList);
		cocktailName = name;
		cocktailRecipe = recipe;
	}

	async function fetchCocktails() {
		try {
			const cocktailData = await API.graphql(graphqlOperation(listCocktails));
			const cocktails = cocktailData.data.listCocktails.items;
			changeCocktailList(shuffle(cocktails));
		} catch (err) {
			console.log('error fetching cocktails', err);
		}
	}

	const updateCocktailList = () => {
		const newCocktailList = drop(cocktailList);
		changeCocktailList(newCocktailList);
		changeIngredientInput([{ quantity: '', measurement: '', name: '' }]);
	};

	const validateIngredients = (e) => {
		e.preventDefault();
		const recipeStrings = ingredientInputs.map((recipe) => {
			const { quantity, measurement, name } = recipe;
			const recipeString = quantity + ' ' + measurement + ' ' + name;
			return recipeString.toLowerCase();
		});

		const recipeVerdict =
			intersection(recipeStrings, cocktailRecipe).length ===
			cocktailRecipe.length;

		const { score, incorrectList } = quizScore;

		if (recipeVerdict === true) {
			updateQuizScore({ ...quizScore, score: score + 1 });
		} else {
			updateQuizScore({
				...quizScore,
				incorrectList: [...incorrectList, { cocktailName, cocktailRecipe }],
			});
		}

		updateCocktailList();
	};

	const addIngredientInput = (e) => {
		e.preventDefault();
		changeIngredientInput([
			...ingredientInputs,
			{ quantity: '', measurement: '', name: '' },
		]);
	};

	const handleUpdateInputValues = (e, i) => {
		const type = e.target.getAttribute('data-type');
		const { value } = e.target;

		let inputs = [...ingredientInputs];
		let input = inputs[i];

		input[type] = value;

		inputs[i] = input;
		changeIngredientInput(inputs);
	};

	const { score } = quizScore;
	const renderControls = () => {
		if (cocktailName) {
			return (
				<div className='quiz-form'>
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
				</div>
			);
		} else {
			const { incorrectList } = quizScore;
			return (
				<div>
					<p className='inc-title'>Incorrect Answers</p>
					{incorrectList.map((cocktail, idx) => (
						<div key={idx}>
							<p className='inc-cocktail-name'>
								Cocktail: {cocktail.cocktailName}
							</p>
							<p className='inc-recipe'>
								Correct Recipe: {cocktail.cocktailRecipe.join(', ')}
							</p>
						</div>
					))}
				</div>
			);
		}
	};

	const renderCocktailName = () => {
		if (cocktailName) {
			return (
				<p className='cocktail-title'>
					<span>{cocktailName}</span>
				</p>
			);
		}
	};

  const renderSubmitButton = () => {
    if (cocktailName) {
      return (
        <button className='quiz-submit' onClick={validateIngredients}>
						Submit
				</button>
      )
    }
  }

	useEffect(() => {
		fetchCocktails();
	}, []);

	return (
		<div className='quiz'>
			<div>
				<h2>Cocktail Quiz</h2>
				<p>
					Score: <span className='fade-in'>{score}</span>
				</p>
        {renderSubmitButton()}
			</div>
			<div className='quiz-boxes-container'>
				<div className='quiz-boxes left'>
					{renderCocktailName()}
					<img
						src='https://horizonlives3.s3.amazonaws.com/PR1517/Haig_Coffee_Negroni.png'
						className='cocktail-image'
						alt='cocktail'
					/>
				</div>
				<div className='quiz-boxes right'>{renderControls()}</div>
			</div>
		</div>
	);
};

export default Quiz;
