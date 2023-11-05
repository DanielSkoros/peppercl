const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export interface IRequestArgs {
  method?: string
  query?: { [key: string]: any }
  payload?: { [key: string]: any } | string
}

export const request = async ({ url = '', method = 'GET', query = {}, payload = {} }) => {
  const requestArgs: IRequestArgs = {
    method,
    query
  }
  if (!url.startsWith('/')) url = `/${url}`
  if (method == 'POST')
    requestArgs.payload = typeof payload !== 'string' ? JSON.stringify(payload) : payload
  const res = await fetch(`${BASE_URL}${url}`, requestArgs)

  return { status: res.status, data: res.json() }
}
