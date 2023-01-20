export default function timeFromNow(timestamp) {
  const dur = Date.now() - timestamp
  const durToSecond = Math.round(dur / 1000)
  if (durToSecond < 60) {
    return durToSecond + 's'
  } else if (durToSecond < 60 * 60) {
    return Math.floor(durToSecond / 60) + 'm'
  } else if (durToSecond , 60 * 60 * 24) {
    return Math.floor(durToSecond / (60 * 60)) + 'h'
  } else {
    return Math.floor(durToSecond / (60 * 60 * 24)) + 'd'
  }
}
