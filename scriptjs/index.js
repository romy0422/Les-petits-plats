import { RecipeBuild } from './recipe.js'
import { recipes } from './data/recipes.js'
import { removeMultiple, styleInput } from './utils.js'
import { searchRecipes, searchRecipesTags, listTag } from './search.js'

export let arrayRecipesToFilter = [] // tableau global pour les recettes filtrées
let arrayListIngredient = [] // tableau global pour la liste ingredient
let arrayListAppliance = [] // tableau global pour la liste appareil
let arrayListUstensil = [] // tableau global pour la liste ustensil

const tagSelected = document.querySelector('#tag-selected') // selection du conteneur des tags que l'utilisateur selectionne

// pour la gestion des interactions utilisateurs
function interaction () {
  const globalSearch = document.querySelector('#global-searchbar') // selection de la barre de recherche globale

  arrayRecipesToFilter = searchRecipes('', recipes) // le tableau global prend la valeur des recettes filtrées
  displayRecipes() // appel la fonction pour afficher les recettes

  globalSearch.addEventListener('input', (e) => {
    const wordKey = e.target.value
    // condition autour de la longueur du mot clé pour executer la recherche
    if (wordKey.length > 3) {
      arrayRecipesToFilter = searchRecipes(wordKey, recipes)
      displayRecipes()
    } else if (wordKey.length < 3) {
      arrayRecipesToFilter = searchRecipes('', recipes)
      displayRecipes()
    }
  })
  globalSearch.addEventListener('click', () => {
    const wordKey = globalSearch.value
    if (wordKey.length > 3) {
      arrayRecipesToFilter = searchRecipes(wordKey, recipes)
      displayRecipes()
    } else if (wordKey.length < 3) {
      arrayRecipesToFilter = searchRecipes('', recipes)
      displayRecipes()
    }
  })

  //  La gestion des tags selectionnés ainsi que pour la gestion de l'actualisation des tags disponibles dans les listes : ingredient/appareil/ustensil
  document.addEventListener('mousedown', (e) => {
    // à chaque clique, verifie si la cible de la souris contient la class list-ingredient et que le conteneur des tags selectionnées ne contient pas l'id de la cible
    if (e.target.classList.contains('list-ingredient') && tagSelected.querySelector(`#${e.target.id}`) === null) {
      const targetTag = e.target.id // cree une constante de l'id du tag
      const targetTagTextContent = e.target.textContent // cree une constante du contenu (textContent) de tag
      tagSelected.innerHTML += `<div class = 'element-list list-ingredient fa-regular fa-circle-xmark fa-lg' id="${targetTag}"><p>${targetTagTextContent}</p></div>` // cree le tag dans le conteneur
    } else if (e.target.classList.contains('list-appliance') && tagSelected.querySelector(`#${e.target.id}`) === null) {
      const targetTag = e.target.id
      const targetTagTextContent = e.target.textContent
      tagSelected.innerHTML += `<div class = 'element-list list-appliance fa-regular fa-circle-xmark fa-lg' id="${targetTag}"><p>${targetTagTextContent}</p></div>`
    } else if (e.target.classList.contains('list-ustensil') && tagSelected.querySelector(`#${e.target.id}`) === null) {
      const targetTag = e.target.id
      const targetTagTextContent = e.target.textContent
      tagSelected.innerHTML += `<div class = 'element-list list-ustensil fa-regular fa-circle-xmark fa-lg' id="${targetTag}"><p>${targetTagTextContent}</p></div>`
    } else if (
      // à chaque clique, verifie si la cible contient la class list-ingredient ET que l'id de l'element cliqué est déjà dans le conteneur
      e.target.classList.contains('list-ingredient') && tagSelected.querySelector(`#${e.target.id}`) !== null) {
      tagSelected.removeChild(document.querySelector(`#${e.target.id}`)) // efface l'id de l'element cliqué du conteneur
      const wordKey = globalSearch.value // recupère le motclé de la recherche globale dans une constante
      arrayRecipesToFilter = searchRecipes(wordKey, recipes) // met à jour les recettes filtrés en prenant en compte le tag absent.
      displayRecipes()
    } else if (e.target.classList.contains('list-appliance') && tagSelected.querySelector(`#${e.target.id}`) !== null) {
      tagSelected.removeChild(document.querySelector(`#${e.target.id}`))
      const wordKey = globalSearch.value
      arrayRecipesToFilter = searchRecipes(wordKey, recipes)
      displayRecipes()
    } else if (e.target.classList.contains('list-ustensil') && tagSelected.querySelector(`#${e.target.id}`) !== null) {
      tagSelected.removeChild(document.querySelector(`#${e.target.id}`))
      const wordKey = globalSearch.value
      arrayRecipesToFilter = searchRecipes(wordKey, recipes)
      displayRecipes()
    }
  })

  document.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('element-list')) {
      const wordKey = globalSearch.value
      arrayRecipesToFilter = searchRecipes(wordKey, recipes) // met à jour la liste des recettes
      displayRecipes()

      const inputIngredients = document.querySelector('#input-ingredients')
      const inputAppliances = document.querySelector('#input-appliances')
      const inputUstensils = document.querySelector('#input-ustensils')
      // gerer le comportement et le style à l'affichage des listes de tags
      styleInput('ingredients', inputIngredients, 'close')
      styleInput('appliance', inputAppliances, 'close')
      styleInput('ustensils', inputUstensils, 'close')
    }
  })
}

// appel de la fonction interaction au chargement de la page
interaction()

// algorithme version 2 : boucle For pour construction div des recettes visibles
function displayRecipes () {
  const allRecipes = document.querySelector('.all-recipes') // conteneur mère des recettes à l'affichage
  const arrayRecipeTagId = [] // stockera dans une constante les id des tags valides
  // si la liste des tags selectionnés est vide
  if (searchRecipesTags().length === 0) {
    allRecipes.innerHTML = ''
    arrayListIngredient = []
    arrayListAppliance = []
    arrayListUstensil = []
    // boucle directement les recettes filtrées
    for (let i = 0; i < arrayRecipesToFilter.length; i++) {
      // construit les recettes avec la fonction factory RecipeBuild
      const recipeDisplay = RecipeBuild(arrayRecipesToFilter[i].id, arrayRecipesToFilter[i].name, arrayRecipesToFilter[i].ingredients, arrayRecipesToFilter[i].time, arrayRecipesToFilter[i].description).recipeBuildDiv()
      arrayRecipesToFilter[i].ingredients.forEach((ingredientOne) => { arrayListIngredient.push(ingredientOne.ingredient) })
      arrayListAppliance.push(arrayRecipesToFilter[i].appliance)
      arrayListUstensil.push(...arrayRecipesToFilter[i].ustensils)
      allRecipes.appendChild(recipeDisplay)
    }
    // si la liste des tags selection est plus grand que 0
  } else if (searchRecipesTags().length > 0) {
    arrayListIngredient = []
    arrayListAppliance = []
    arrayListUstensil = []
    allRecipes.innerHTML = ''
    for (let i = 0; i < arrayRecipesToFilter.length - 1; i++) {
      if (searchRecipesTags().includes(arrayRecipesToFilter[i].id)) {
        arrayRecipeTagId.push(arrayRecipesToFilter[i])
      }
    }
    // boucle sur les ids des recettes filtrés par les tags
    for (let i = 0; i < arrayRecipeTagId.length; i++) {
      console.log(arrayRecipeTagId)
      // construit la recette dont l'id correspond à l'id validé par la liste des tags
      const recipeDisplay = RecipeBuild(arrayRecipeTagId[i].id, arrayRecipeTagId[i].name, arrayRecipeTagId[i].ingredients, arrayRecipeTagId[i].time, arrayRecipeTagId[i].description).recipeBuildDiv()
      arrayRecipeTagId[i].ingredients.forEach((ingredientOne) => { arrayListIngredient.push(ingredientOne.ingredient) })
      arrayListAppliance.push(arrayRecipeTagId[i].appliance)
      arrayListUstensil.push(...arrayRecipeTagId[i].ustensils)
      allRecipes.appendChild(recipeDisplay)
    }
  }
  // s'il n'existe pas de class recipe__article à l'affichage, affiche le message qui le signal
  if (document.querySelector('.recipe__article') === null) {
    displayMessageEmpty(allRecipes)
  }
  // enlève les doublons et les S des listes de tags
  arrayListIngredient = removeMultiple(arrayListIngredient)
  arrayListAppliance = removeMultiple(arrayListAppliance)
  arrayListUstensil = removeMultiple(arrayListUstensil)
  displayListTag()
}

// affichage liste des Tags

function displayListTag () {
  const inputIngredients = document.querySelector('#input-ingredients')
  const inputAppliances = document.querySelector('#input-appliances')
  const inputUstensils = document.querySelector('#input-ustensils')

  const listIngredient = document.querySelector('#list-ingredients')
  const listAppliance = document.querySelector('#list-appliances')
  const listUstensil = document.querySelector('#list-ustensils')

  const displayIngredientsButton = document.querySelector('#ingredient-angle')
  const displayAppliancesButton = document.querySelector('#appliance-angle')
  const displayUstensilsButton = document.querySelector('#ustensil-angle')

  listIngredient.innerHTML = ''
  listAppliance.innerHTML = ''
  listUstensil.innerHTML = ''

  // pour gerer l'ouverture et la fermeture des listes de tags au click du chevron
  let clickDoubleI = false
  let clickDoubleA = false
  let clickDoubleU = false

  displayIngredientsButton.addEventListener('click', () => {
    if (!clickDoubleI) {
      clickDoubleI = true
      displayIngredientsButton.className = 'fa-solid fa-angle-up fa-xl angle-position'
      styleInput('ingredients', inputIngredients, 'open')
      const wordKey = inputIngredients.value
      const arrayListIngredientUp = listTag(wordKey, arrayListIngredient)
      listIngredient.innerHTML = ''
      arrayListIngredientUp.forEach((ingredient) => { listIngredient.innerHTML += `<div class = 'element-list list-ingredient' id=${ingredient.replaceAll(' ', '-').replaceAll("'", '').split('(')[0]}>${ingredient}</div>` })
    } else {
      clickDoubleI = false
      displayIngredientsButton.className = 'fa-solid fa-angle-down fa-xl angle-position'
      styleInput('ingredients', inputIngredients, 'close')
      listIngredient.innerHTML = ''
    }
  })
  displayAppliancesButton.addEventListener('click', () => {
    if (!clickDoubleA) {
      clickDoubleA = true
      displayAppliancesButton.className = 'fa-solid fa-angle-up fa-xl angle-position'
      styleInput('appliance', inputAppliances, 'open')
      const wordKey = inputAppliances.value
      const arrayListApplianceUp = listTag(wordKey, arrayListAppliance)
      listAppliance.innerHTML = ''
      arrayListApplianceUp.forEach((appliance) => { listAppliance.innerHTML += `<div class = 'element-list list-appliance'  id=${appliance.replaceAll(' ', '-').split('(')[0]}>${appliance}</div>` })
    } else {
      clickDoubleA = false
      displayAppliancesButton.className = 'fa-solid fa-angle-down fa-xl angle-position'
      styleInput('appliance', inputAppliances, 'close')
      listAppliance.innerHTML = ''
    }
  })
  displayUstensilsButton.addEventListener('click', () => {
    if (!clickDoubleU) {
      clickDoubleU = true
      displayUstensilsButton.className = 'fa-solid fa-angle-up fa-xl angle-position'
      styleInput('ustensils', inputUstensils, 'open')
      const wordKey = inputUstensils.value
      const arrayListUstensilUp = listTag(wordKey, arrayListUstensil)
      listUstensil.innerHTML = ''
      arrayListUstensilUp.forEach((ustensil) => { listUstensil.innerHTML += `<div class = 'element-list list-ustensil'  id=${ustensil.replaceAll(' ', '-').split('(')[0]}>${ustensil}<div>` })
    } else {
      clickDoubleU = false
      displayUstensilsButton.className = 'fa-solid fa-angle-down fa-xl angle-position'
      styleInput('ustensils', inputUstensils, 'close')
      listUstensil.innerHTML = ''
    }
  })

  // gère l'affichage de la liste à chaque frappe sur le clavier
  inputIngredients.addEventListener('input', (e) => {
    const wordKey = e.target.value
    styleInput('ingredients', inputIngredients, 'write')
    if (wordKey.length > 2) {
      const arrayListIngredientUp = listTag(wordKey, arrayListIngredient)
      listIngredient.innerHTML = ''
      arrayListIngredientUp.forEach((ingredient) => { listIngredient.innerHTML += `<div class = 'element-list list-ingredient' id=${ingredient.replaceAll(' ', '-').split('(')[0]}>${ingredient}</div>` })
    } else {
      listIngredient.innerHTML = ''
      arrayListIngredient.forEach((ingredient) => { listIngredient.innerHTML += `<div class = 'element-list list-ingredient' id=${ingredient.replaceAll(' ', '-').split('(')[0]}>${ingredient}</div>` })
    }
  })

  inputAppliances.addEventListener('input', (e) => {
    const wordKey = e.target.value
    styleInput('appliance', inputAppliances, 'write')
    if (wordKey.length > 2) {
      const arrayListApplianceUp = listTag(wordKey, arrayListAppliance)
      listAppliance.innerHTML = ''
      arrayListApplianceUp.forEach((appliance) => { listAppliance.innerHTML += `<div class = 'element-list list-appliance'  id=${appliance.replaceAll(' ', '-').split('(')[0]}>${appliance}</div>` })
    } else {
      listAppliance.innerHTML = ''
      arrayListAppliance.forEach((appliance) => { listAppliance.innerHTML += `<div class = 'element-list list-appliance' id=${appliance.replaceAll(' ', '-').split('(')[0]}>${appliance}</div>` })
    }
  }
  )

  inputUstensils.addEventListener('input', (e) => {
    const wordKey = e.target.value
    styleInput('ustensils', inputUstensils, 'write')
    if (wordKey.length > 2) {
      const arrayListUstensilUp = listTag(wordKey, arrayListUstensil)
      listUstensil.innerHTML = ''
      arrayListUstensilUp.forEach((ustensil) => { listUstensil.innerHTML += `<div class = 'element-list list-ustensil'  id=${ustensil.replaceAll(' ', '-').split('(')[0]}>${ustensil}<div>` })
    } else {
      listUstensil.innerHTML = ''
      arrayListUstensil.forEach((ustensil) => { listUstensil.innerHTML += `<div class = 'element-list list-ustensil'  id=${ustensil.replaceAll(' ', '-').split('(')[0]}>${ustensil}<div>` })
    }
  })
}

function displayMessageEmpty (allRecipes) {
  const messageEmpty = document.createElement('div')
  messageEmpty.setAttribute('class', 'message-empty')
  messageEmpty.textContent = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc...'

  allRecipes.appendChild(messageEmpty)
}
