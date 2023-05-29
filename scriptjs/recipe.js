export function RecipeBuild (id, name, ingredients, time, description) {
  function recipeBuildDiv () {
    const headTitle = document.createElement('h2')
    const timeMinuteRecipe = document.createElement('div')
    const bodyRecipe = document.createElement('div')
    const ingredientRecipe = document.createElement('div')
    const guidRecipe = document.createElement('div')
    const recipes = document.createElement('article')
    const recipesImgContain = document.createElement('div')
    const descriptionRecipes = document.createElement('div')
    const headRecipe = document.createElement('div')
    const iconeTime = document.createElement('i')
    const timeRecipe = document.createElement('div')

    timeMinuteRecipe.setAttribute('class', 'head__time-preparation')
    iconeTime.setAttribute('class', 'fa-regular fa-clock fa-lg')
    timeRecipe.setAttribute('class', 'time-preparation')
    bodyRecipe.setAttribute('class', 'recipe__description')
    recipes.setAttribute('id', `i-${id}`)
    recipes.setAttribute('class', 'recipe__article')
    recipesImgContain.setAttribute('class', 'recipe__image')
    descriptionRecipes.setAttribute('class', 'recipe__detail')
    headRecipe.setAttribute('class', 'recipe__head')
    headTitle.setAttribute('class', 'recipe__title')
    ingredientRecipe.setAttribute('class', 'recipe__ingredient')
    guidRecipe.setAttribute('class', 'recipe__guid')
    headTitle.textContent = name
    timeRecipe.textContent = `${time} min`
    guidRecipe.textContent = description

    ingredients.forEach((oneIngredient) => {
      let quantityFiltre = ''
      let unitFiltre = ''
      if (oneIngredient.quantity !== undefined) {
        quantityFiltre = oneIngredient.quantity
      }
      if (oneIngredient.unit === 'grammes') {
        unitFiltre = 'g'
      } else if (oneIngredient.unit === 'cuillères à soupe') {
        unitFiltre = 'cuillères'
      } else if (oneIngredient.unit !== undefined) {
        unitFiltre = oneIngredient.unit
      }

      ingredientRecipe.innerHTML += `<div class="container-ingredient"><div class = 'ingredient'>${oneIngredient.ingredient}</div> <p> : ${quantityFiltre} ${unitFiltre}</p></div>`
    })
    recipes.appendChild(recipesImgContain)
    recipes.appendChild(descriptionRecipes)
    descriptionRecipes.appendChild(headRecipe)
    descriptionRecipes.appendChild(bodyRecipe)
    headRecipe.appendChild(headTitle)
    headRecipe.appendChild(timeMinuteRecipe)
    timeMinuteRecipe.appendChild(iconeTime)
    timeMinuteRecipe.appendChild(timeRecipe)
    bodyRecipe.appendChild(ingredientRecipe)
    bodyRecipe.appendChild(guidRecipe)

    return recipes
  }
  return { recipeBuildDiv }
}
