export const tagIdRecipeValidate = []

export function searchRecipes (wordKeys, recipesArray) {
  console.log(recipesArray)
  const recipesFiltred = recipesArray.filter((recipe) => { return (recipe.name.toLowerCase()).includes(wordKeys.toLowerCase()) || (recipe.description.toLowerCase()).includes(wordKeys.toLowerCase()) || recipe.ingredients.includes(wordKeys) || (recipe.appliance.toLowerCase()).includes(wordKeys.toLowerCase()) || (recipe.ustensils).includes(wordKeys) })
  console.log(recipesFiltred)
  return recipesFiltred
}

export function searchRecipesTags (recipesArray) {
  const tagsSelection = document.querySelector('#tag-selected')
  const tagIdRecipeTrue = []
  const tagIdRecipeFalse = []
  let tagIdRecipeValidate = []
  if (tagsSelection.querySelector('.element-list') !== null) {
    const tagElement = tagsSelection.querySelectorAll('.element-list')
    tagElement.forEach((tag) => {
      recipesArray.forEach((recipe) => {
        if (JSON.stringify(recipe).toLowerCase().includes(tag.textContent.toLowerCase())) {
          tagIdRecipeTrue.push(recipe.id)
        } else {
          tagIdRecipeFalse.push(recipe.id)
        }
      })
    })
    tagIdRecipeValidate = tagIdRecipeTrue.filter((recipe) => !tagIdRecipeFalse.includes(recipe))
    tagIdRecipeFalse.forEach((id) => { document.querySelector(`#i-${id}`).className = 'recipe__hidden' })
    tagIdRecipeValidate.forEach((id) => { document.querySelector(`#i-${id}`).className = 'recipe__article' })
  } else {
    recipesArray.forEach((recipe) => {
      document.querySelector(`#i-${recipe.id}`).className = 'recipe__article'
    })
  }
  return tagIdRecipeValidate
}
