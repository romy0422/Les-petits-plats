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

// recherche par tag parmis les recettes
export function searchRecipesTags () {
  const tagsSelection = document.querySelector('#tag-selected') // le conteneur
  const tagIdRecipeTrue = [] // initialise le tableau des recettes correspondantes aux tags
  const tagIdRecipeFalse = [] // initialise le tableau des recettes ne correspondant pas aux tags
  tagIdRecipeValidate = [] // initialise le tableau uniquement des recettes correspondantes à tous les tags
  if (tagsSelection.querySelector('.element-list') !== null) {
    const tagElement = tagsSelection.querySelectorAll('.element-list') // selectionne dans la constante tous les tags dans une liste
    // parcours la liste des tags selectionnés
    tagElement.forEach((tag) => {
      arrayRecipesToFilter.forEach((recipe) => {
        // si la recette contient au moins un des tags
        if (JSON.stringify(recipe.ingredients).toLowerCase().includes(tag.textContent.toLowerCase()) || JSON.stringify(recipe.appliance).toLowerCase().includes(tag.textContent.toLowerCase()) || JSON.stringify(recipe.ustensils).toLowerCase().includes(tag.textContent.toLowerCase())) {
          tagIdRecipeTrue.push(recipe.id)// l'id de la recette est recupéré dans le tableau des id vraies
        } else {
          tagIdRecipeFalse.push(recipe.id)// sinon l'id de la recette est recupéré dans le tableau des id faux
        }
      })
    })
    tagIdRecipeValidate = tagIdRecipeTrue.filter((recipe) => !tagIdRecipeFalse.includes(recipe)) // met dans une constante uniquement les id des recettes
    // n'ayant pas de présence dans la liste des faux
  }
  // retourne le tableau des id des recettes filtrées par la contrainte des tags
  return tagIdRecipeValidate
}

// retourne la liste des tags filtrée par les mots clés
export function listTag (wordKey, listTag) {
  const list = listTag.filter((list) => { return (list.toLowerCase()).includes(wordKey.toLowerCase()) })
  return list
}
