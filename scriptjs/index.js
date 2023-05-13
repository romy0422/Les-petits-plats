import { RecipeBuild } from './recipe.js'
import { recipes } from './data/recipes.js'

const arrayRecipesToFilter = []

function displayRecipes () {
  arrayRecipesToFilter.push(...recipes)
  const allRecipes = document.querySelector('.all-recipes')
  arrayRecipesToFilter.forEach((recipe) => {
    const recipeDisplay = RecipeBuild(recipe.id, recipe.name, recipe.ingredients, recipe.time, recipe.description).recipeBuildDiv()
    allRecipes.appendChild(recipeDisplay)
  })
}

displayRecipes()
