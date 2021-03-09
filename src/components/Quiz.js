import React, { useState } from 'react';
import { first, shuffle, drop, intersection} from 'lodash'

const Cocktails = [
  {
    name: 'Old Fashioned',
    recipe: ['1 cube sugar', '3 dashes bitters', '2 oz rye']
  },
  {
    name: 'Daquiri',
    recipe: ['.75 oz simple syrup', '1 oz lime juice', '2 oz rum']
  },
  {
    name: 'Manhattan',
    recipe: ['.75 oz sweet vermouth', '2 dashes bitters', '2 oz rye']
  }
]

const Quiz = () => {

  const [cocktailList, changeCocktailList] = useState(shuffle(Cocktails))
  const [ingredientInputs, changeIngredientInput] = useState([{quantity: '', measurement: '', ingredient: ''}])
  const [quizScore, updateQuizScore] = useState({score: 0, incorrectList: []})

  let cocktailName
  let cocktailRecipe

  if (cocktailList.length >= 1) {
    const { name, recipe } = first(cocktailList)
    cocktailName = name
    cocktailRecipe = recipe
  }

  const updateCocktailList  = () => {
    const newCocktailList = drop(cocktailList)
    changeCocktailList(newCocktailList)
    changeIngredientInput([{quantity: '', measurement: '', ingredient: ''}])
  }

  const validateIngredients = (e) => {
    e.preventDefault()
    const recipeStrings = []

    ingredientInputs.map((recipe) => {
      const {quantity, measurement, ingredient} = recipe
      const recipeString = quantity + ' ' + measurement + ' ' + ingredient
      return recipeStrings.push(recipeString.toLowerCase())
    })

    const recipeVerdict = intersection(recipeStrings, cocktailRecipe).length === cocktailRecipe.length

    const { score, incorrectList } = quizScore

    if (recipeVerdict === true ) {
      updateQuizScore({score: score + 1, incorrectList: quizScore.incorrectList})
    } else {
      incorrectList.push({cocktailName, cocktailRecipe })
      updateQuizScore({score: score, incorrectList: incorrectList})
    }

    updateCocktailList()
  }

  const addIngredientInput = (e) => {
    e.preventDefault()
    changeIngredientInput([...ingredientInputs, {quantity: '', measurement: '', ingredient: ''}])
  }

  const updateInputValues = (e) => {
    const i = e.target.getAttribute('data-index')
    const type = e.target.getAttribute('data-type')
    const { value } = e.target

    let inputs = [...ingredientInputs]
    let input = inputs[i]

    switch (type) {
      case 'quantity':
        input.quantity = value
        break;
      case 'measurement':
        input.measurement = value
        break;
      case 'ingredient':
        input.ingredient = value
        break;
      default:
        return
    }

    inputs[i] = input
    changeIngredientInput(inputs)
  }
  
  const { score } = quizScore;

  const renderControls = () => {
    
    if (cocktailName) {
      return (
        <form>
          <label>Ingredient List
          <br />
          {ingredientInputs.map((ingredients, idx) => (
            <div key={idx} >
              <input data-index={idx} data-type='quantity' placeholder="quantity" onChange={updateInputValues} value={ingredients.quantity}/>
              <select data-index={idx} data-type='measurement' onChange={updateInputValues} value={ingredients.measurement}>
                <option value="" disabled></option>
                <option value="oz">oz</option>
                <option value="dashes">dashe(s)</option>
                <option value="cube">cube</option>
              </select>
              <input data-index={idx} data-type='ingredient' placeholder="ingredient" onChange={updateInputValues} value={ingredients.ingredient}/>
            </div>
          ))}
          <br />
          <button onClick={addIngredientInput}>+</button>
          <br />
          <button className="quiz-submit" onClick={validateIngredients}>Submit</button>
          </label>
        </form>
      )
    } else {

      const { incorrectList } = quizScore
      return (
        <div>
          <p className="inc-title">Incorrect Answers</p>
          {incorrectList.map((cocktail, idx) => (
            <div key={idx} >
              <p className="inc-cocktail-name">Cocktail: {cocktail.cocktailName}</p>
              <p className="inc-recipe">Correct Recipe: {cocktail.cocktailRecipe.join(', ')}</p>
            </div>
          ))}
        </div>
      )
    }
  }

  const renderCocktailName = () => {
    if (cocktailName) {
      return (
        <p>
          <span className="cocktail-name">{cocktailName}</span>
        </p>
      )
    }
  }

  return (
    <div className="quiz">
      <header>Cocktail Quiz</header>
      <p>Score: <span className="fade-in">{score}</span></p>
      {renderCocktailName()}
      <img src="https://horizonlives3.s3.amazonaws.com/PR1517/Haig_Coffee_Negroni.png" className="cocktail-image" alt="cocktail"/>
      {renderControls()}
    </div>
  )
}

export default Quiz