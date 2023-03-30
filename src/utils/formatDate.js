function formatDate(fmt, timestamp) {
  const times = timestamp ? new Date(timestamp) : new Date()
  const o = {
    'M+': times.getMonth() + 1,
    'd+': times.getDate(),
    'h+': times.getHours(),
    'm+': times.getMinutes(),
    's+': times.getSeconds(),
    'q+': Math.floor((times.getMonth() + 3) / 3),
    S: times.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (times.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
export default formatDate
