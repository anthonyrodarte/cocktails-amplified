import React, { useEffect, useState }from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { createCocktail } from '../graphql/mutations'
import Ingredients from './Ingredients';

const initialState = [{quantity: '', measurement: '', name: ''}]

const CocktailForm = () => {
  const [ingredientInputs, changeIngredientInput] = useState(initialState)
  const [cocktailName, setCocktailName] = useState('')
  const [currentUsername, setCurrentUsername] = useState('')


  const handleUpdateInputValues = (e, i) => {
    const type = e.target.getAttribute('data-type')
    const { value } = e.target

    let inputs = [...ingredientInputs]
    let input = inputs[i]

    input[type] = value; 
    inputs[i] = input
    changeIngredientInput(inputs)
  }

  const addIngredientInput = (e) => {
    e.preventDefault()
    changeIngredientInput([...ingredientInputs, {quantity: '', measurement: '', name: ''}])
  }

  const getUser = () => {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  const setInput = (value) => {
    setCocktailName( value )
  }

  async function addCocktail(e) {
    e.preventDefault()
    try {
      if (!cocktailName || !currentUsername) return
      const recipeStrings = ingredientInputs.map((recipe) => {
        const {quantity, measurement, name} = recipe
        const recipeString = quantity + ' ' + measurement + ' ' + name
        return recipeString.toLowerCase()
      })

      const cocktailPayload = { 
        name: cocktailName,
        recipe: recipeStrings,
        username: currentUsername
       }
       setCocktailName('')
       changeIngredientInput(initialState)
       await API.graphql(graphqlOperation(createCocktail, {input: cocktailPayload}))
    } catch (err) {
      console.log('error creating cocktail:', err)
    }
  }

  useEffect(() => {
    getUser().then( userData => setCurrentUsername(userData.username))
  }, [])

  return (
    <div>
      <form>
      <input
        onChange={event => setInput(event.target.value)}
        value={cocktailName}
        placeholder="CocktailName"
      />
        <div className="ingredients-container">
          <p className="ingredients-title">Ingredients</p>
          <div className="ingredients-list-container">
            {ingredientInputs.map((ingredient, idx) => (
              <Ingredients key={idx} ingredient={ingredient} onUpdateInputValues={handleUpdateInputValues} idx={idx} />
            ))}
          </div>
          <button onClick={addIngredientInput}>+</button>
        </div>
        <button onClick={addCocktail}>Submit</button>
      </form>
    </div>
  )
}

export default CocktailForm