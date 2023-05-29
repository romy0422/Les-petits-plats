
export function removeMultiple (datas) {
  const dataLowerCaserCase = []
  datas.forEach((data) => {
    dataLowerCaserCase.push(data.toLowerCase())
  })

  const one = dataLowerCaserCase.filter((data, index) => {
    return dataLowerCaserCase.indexOf(data) === index
  })

  const dataWithoutS = []
  one.forEach((data, index, parent) => {
    if (data.charAt(data.length - 1) === 's' && parent.includes(data.substr(0, data.length - 1)) === false) {
      dataWithoutS.push(data)
    } else if (data.charAt(data.length - 1) !== 's') {
      dataWithoutS.push(data)
    }
  })
  return dataWithoutS
}

export function styleInput (type, input, state) {
  if (state === 'open') {
    input.style.opacity = '0.5'
    input.style.width = '230px'
    input.style.height = '50px'
    switch (type) {
      case 'ingredients':
        input.placeholder = 'Rechercher un ingredient'
        break
      case 'appliance':
        input.placeholder = 'Rechercher un appareil'
        break
      case 'ustensils':
        input.placeholder = 'Rechercher un ustensil'
        break
    }
  } else if (state === 'close') {
    input.style.opacity = '1'
    input.style.width = '130px'
    input.style.height = '50px'
    switch (type) {
      case 'ingredients':
        input.placeholder = 'Ingredients'
        break
      case 'appliance':
        input.placeholder = 'Appareils'
        break
      case 'ustensils':
        input.placeholder = 'Ustensils'
        break
    }
  } else if (state === 'write') {
    input.style.opacity = '1'
    input.style.width = '230px'
    input.style.height = '50px'
  }
}
