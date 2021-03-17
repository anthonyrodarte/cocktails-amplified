import React from 'react';

const Ingredients = ( {ingredient, onUpdateInputValues, idx}) => {

  const handleChange = (e) => {
    onUpdateInputValues(e, idx)
  }

  return (
    <div className="ingredient-inputs">
      <input  data-type='quantity' placeholder="quantity" onChange={handleChange} value={ingredient.quantity} className="quantity-input"/>
      <select data-type='measurement' onChange={handleChange} value={ingredient.measurement} className="measurement-input">
        <option value="" disabled></option>
        <option value="oz">oz</option>
        <option value="dashes">dashe(s)</option>
        <option value="cube">cube</option>
      </select>
      <input data-type='name' placeholder="ingredient" onChange={handleChange} value={ingredient.name} className="ingredient-name-input"/>
    </div>
  )
}

export default Ingredients