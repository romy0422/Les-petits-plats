
export function removeMultiple (datas) {
  const one = datas.filter((data, index) => {
    return datas.indexOf(data) === index
  })
  return one
}
