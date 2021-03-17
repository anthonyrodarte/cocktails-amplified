import React, { useState }from 'react';

import Ingredients from './Ingredients';

const CocktailForm = () => {
  const [ingredientInputs, changeIngredientInput] = useState([{quantity: '', measurement: '', name: ''}])

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

  return (
    <div>
      <form>
        <div className="ingredients-container">
          <p className="ingredients-title">Ingredients</p>
          <div className="ingredients-list-container">
            {ingredientInputs.map((ingredient, idx) => (
              <Ingredients key={idx} ingredient={ingredient} onUpdateInputValues={handleUpdateInputValues} idx={idx} />
            ))}
          </div>
          <button onClick={addIngredientInput}>+</button>
        </div>
      </form>
    </div>
  )
}

export default CocktailForm