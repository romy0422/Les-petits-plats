import { arrayRecipesToFilter } from './index.js'
export let tagIdRecipeValidate = []

// version algorithme v2 : boucle for pour la recherche des recettes
export function searchRecipes (wordKeys, recipesArray) {
  const recipesFiltred = []
  for (let i = 0; i < recipesArray.length; i++) {
    if (JSON.stringify(recipesArray[i].name).toLowerCase().includes(wordKeys.toLowerCase()) || JSON.stringify(recipesArray[i].description).toLowerCase().includes(wordKeys.toLowerCase()) || JSON.stringify(recipesArray[i].ingredients).toLowerCase().includes(wordKeys.toLowerCase())) {
      recipesFiltred.push(recipesArray[i])
    }
  }
  return recipesFiltred
}

export function searchRecipesTags () {
  const tagsSelection = document.querySelector('#tag-selected')
  const tagIdRecipeTrue = []
  const tagIdRecipeFalse = []
  tagIdRecipeValidate = []
  if (tagsSelection.querySelector('.element-list') !== null) {
    const tagElement = tagsSelection.querySelectorAll('.element-list')
    tagElement.forEach((tag) => {
      arrayRecipesToFilter.forEach((recipe) => {
        if (JSON.stringify(recipe.ingredients).toLowerCase().includes(tag.textContent.toLowerCase()) || JSON.stringify(recipe.appliance).toLowerCase().includes(tag.textContent.toLowerCase()) || JSON.stringify(recipe.ustensils).toLowerCase().includes(tag.textContent.toLowerCase())) {
          tagIdRecipeTrue.push(recipe.id)
        } else {
          tagIdRecipeFalse.push(recipe.id)
        }
      })
    })
    tagIdRecipeValidate = tagIdRecipeTrue.filter((recipe) => !tagIdRecipeFalse.includes(recipe))
  }
  return tagIdRecipeValidate
}

export function listTag (wordKey, listTag) {
  const list = listTag.filter((list) => { return (list.toLowerCase()).includes(wordKey.toLowerCase()) })
  return list
}
