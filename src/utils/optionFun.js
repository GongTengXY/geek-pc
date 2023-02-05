export const optionFun = (data) => {
  return data.map((item) => {
    return { key: item.id, value: item.id, label: item.name }
  })
}
