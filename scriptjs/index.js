import { RecipeBuild } from './recipe.js'
import { recipes } from './data/recipes.js'
import { removeMultiple } from './utils.js'
import { searchRecipes, searchRecipesTags, tagIdRecipeValidate } from './search.js'

let arrayRecipesToFilter = []
let arrayListIngredient = []
let arrayListAppliance = []
let arrayListUstensil = []

const tagSelected = document.querySelector('#tag-selected')

arrayRecipesToFilter = searchRecipes('', recipes)
displayRecipes()
displayListTag()

function interaction () {
  const globalSearch = document.querySelector('#global-searchbar')
  globalSearch.addEventListener('input', (e) => {
    const wordKey = e.target.value
    if (wordKey.length > 3) {
      arrayRecipesToFilter = searchRecipes(wordKey, recipes)
      searchRecipesTags(arrayRecipesToFilter)
      displayRecipes(tagIdRecipeValidate)
      displayListTag()
    } else {
      arrayRecipesToFilter = searchRecipes('', recipes)
      searchRecipesTags(arrayRecipesToFilter)
      displayRecipes(tagIdRecipeValidate)
      displayListTag()
    }
  })

  document.addEventListener('mousedown', (e) => {
    console.log(e.target.classList)
    if (e.target.classList.contains('list-ingredient') && tagSelected.querySelector(`#${e.target.id}`) === null) {
      const targetTag = e.target.id
      const targetTagTextContent = e.target.textContent
      tagSelected.innerHTML += `<div class = 'list-ingredient element-list fa-regular fa-circle-xmark fa-lg' id="${targetTag}"><p>${targetTagTextContent}</p></div>`
    } else if (e.target.classList.contains('list-appliance') && tagSelected.querySelector(`#${e.target.id}`) === null) {
      const targetTag = e.target.id
      const targetTagTextContent = e.target.textContent
      tagSelected.innerHTML += `<div class = 'list-appliance element-list fa-regular fa-circle-xmark fa-lg' id="${targetTag}"><p>${targetTagTextContent}</p></div>`
    } else if (e.target.classList.contains('list-ustensil') && tagSelected.querySelector(`#${e.target.id}`) === null) {
      const targetTag = e.target.id
      const targetTagTextContent = e.target.textContent
      tagSelected.innerHTML += `<div class = 'list-ustensil element-list fa-regular fa-circle-xmark fa-lg' id="${targetTag}"><p>${targetTagTextContent}</p></div>`
    } else if (e.target.classList.contains('list-ingredient') && tagSelected.querySelector(`#${e.target.id}`) !== null) {
      tagSelected.removeChild(document.querySelector(`#${e.target.id}`))
    } else if (e.target.classList.contains('list-appliance') && tagSelected.querySelector(`#${e.target.id}`) !== null) {
      tagSelected.removeChild(document.querySelector(`#${e.target.id}`))
    } else if (e.target.classList.contains('list-ustensil') && tagSelected.querySelector(`#${e.target.id}`) !== null) {
      tagSelected.removeChild(document.querySelector(`#${e.target.id}`))
    }
  })
}
document.addEventListener('mouseup', () => {
  searchRecipesTags(arrayRecipesToFilter)
  const globalSearch = document.querySelector('#global-searchbar')
  const wordKey = globalSearch.value
  arrayRecipesToFilter = searchRecipes(wordKey, recipes)
  searchRecipesTags(arrayRecipesToFilter)
  displayRecipes(tagIdRecipeValidate)
  displayListTag()
})

interaction()

function displayRecipes () {
  const allRecipes = document.querySelector('.all-recipes')
  allRecipes.innerHTML = ''
  arrayListIngredient = []
  arrayListAppliance = []
  arrayListUstensil = []

  arrayRecipesToFilter.forEach((recipe) => {
    const recipeDisplay = RecipeBuild(recipe.id, recipe.name, recipe.ingredients, recipe.time, recipe.description).recipeBuildDiv()
    recipe.ingredients.forEach((ingredientOne) => { arrayListIngredient.push(ingredientOne.ingredient) })
    arrayListAppliance.push(recipe.appliance)
    arrayListUstensil.push(...recipe.ustensils)
    allRecipes.appendChild(recipeDisplay)
  })

  if (tagIdRecipeValidate.length > 0) {
    const arrayRecipeTagId = arrayRecipesToFilter.filter((recipe) => tagIdRecipeValidate.includes(recipe.id))
    arrayRecipeTagId.forEach((recipe) => {
      recipe.ingredients.forEach((ingredientOne) => { arrayListIngredient.push(ingredientOne.ingredient) })
      arrayListAppliance.push(recipe.appliance)
      arrayListUstensil.push(...recipe.ustensils)
    }
    )
  }

  arrayListIngredient = removeMultiple(arrayListIngredient)
  arrayListAppliance = removeMultiple(arrayListAppliance)
  arrayListUstensil = removeMultiple(arrayListUstensil)
}

// affichage liste des Tags

function displayListTag () {
  const listIngredient = document.querySelector('#list-ingredients')
  const listAppliance = document.querySelector('#list-appliances')
  const listUstensil = document.querySelector('#list-ustensils')

  const displayIngredientsButton = document.querySelector('#ingredient-angle')
  const displayAppliancesButton = document.querySelector('#appliance-angle')
  const displayUstensilsButton = document.querySelector('#ustensil-angle')

  let clickDoubleI = false
  let clickDoubleA = false
  let clickDoubleU = false

  displayIngredientsButton.addEventListener('click', () => {
    if (!clickDoubleI) {
      clickDoubleI = true
      listIngredient.innerHTML = ''
      arrayListIngredient.forEach((ingredient) => { listIngredient.innerHTML += `<div class = 'element-list list-ingredient' id=${ingredient.replaceAll(' ', '-').split('(')[0]}>${ingredient}</div>` })
    } else {
      clickDoubleI = false
      listIngredient.innerHTML = ''
    }
  })
  displayAppliancesButton.addEventListener('click', () => {
    if (!clickDoubleA) {
      clickDoubleA = true
      listAppliance.innerHTML = ''
      arrayListAppliance.forEach((appliance) => { listAppliance.innerHTML += `<div class = 'element-list list-appliance'  id=${appliance.replaceAll(' ', '-').split('(')[0]}>${appliance}</div>` })
    } else {
      clickDoubleA = false
      listAppliance.innerHTML = ''
    }
  })
  displayUstensilsButton.addEventListener('click', () => {
    if (!clickDoubleU) {
      clickDoubleU = true
      listUstensil.innerHTML = ''
      arrayListUstensil.forEach((ustensil) => { listUstensil.innerHTML += `<div class = 'element-list list-ustensil'  id=${ustensil.replaceAll(' ', '-').split('(')[0]}>${ustensil}<div>` })
    } else {
      clickDoubleU = false
      listUstensil.innerHTML = ''
    }
  })
}
