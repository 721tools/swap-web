export default function getListTotalCost(list) {
  let total = 0
  list.forEach((item) => {
    total += parseFloat(item.price)
  })
  return total
}
