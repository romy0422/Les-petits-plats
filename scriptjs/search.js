import { arrayRecipesToFilter } from './index.js'
export let tagIdRecipeValidate = []

export function searchRecipes (wordKeys, recipesArray) {
  const recipesFiltred = recipesArray.filter((recipe) => { return (recipe.name.toLowerCase()).includes(wordKeys.toLowerCase()) || (recipe.description.toLowerCase()).includes(wordKeys.toLowerCase()) || recipe.ingredients.includes(wordKeys) })
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
