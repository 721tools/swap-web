import jsonToQuery from '../utils/jsonToQuery'

const SERVER = 'https://dev.721tools.xyz'

export async function request({
  path,
  data,
  method = 'GET',
  uesSessionStorage = false
}) {
  let url = `${SERVER}${path}`
  let fetchKey = url
  const params = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }
  if (method === 'POST' || (method === 'PUT' && data)) {
    params.body = JSON.stringify(data)
    fetchKey += params.body
  }

  if (method === 'GET' && data) {
    const query = jsonToQuery(data)
    url += (url.indexOf('?') > -1 ? '' : '?') + query
    fetchKey = url
  }

  if (uesSessionStorage) {
    const res = sessionStorage.getItem(fetchKey)
    if (res) {
      return JSON.parse(res)
    }
  }
  const res = await fetch(url, params)

  if (res.status === 200) {
    const resJson = await res.json()
    if (uesSessionStorage) {
      sessionStorage.setItem(fetchKey, JSON.stringify(resJson))
    }
    return resJson
  }
  throw await res.json()
}
