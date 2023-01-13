// Warning: not available for all cases!!!
export default function jsonToQuery(data) {
  let arr = []
  Object.keys(data).map((key) => {
    if (Array.isArray(data[key])) {
      arr = arr.concat(data[key].map((item) => `${key}=${item}`))
    } else {
      arr.push(`${key}=${data[key]}`)
    }
  })
  return arr.join('&')
}
