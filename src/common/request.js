import jsonToQuery from '../utils/jsonToQuery'

const SERVER = ''

export async function request(path, data, method = 'GET') {
  let url = `${SERVER}${path}`
  const params = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }
  if (method === 'POST' || (method === 'PUT' && data)) {
    params.body = JSON.stringify(data)
  }

  if (method === 'GET' && data) {
    const query = jsonToQuery(data)
    url += (url.indexOf('?') > -1 ? '' : '?') + query
  }
  const res = await fetch(url, params)

  if (res.status === 200) {
    return await res.json()
  }
  throw await res.json()
}
