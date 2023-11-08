import router from "@/router"

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export interface IRequestArgs {
  method?: string
  query?: { [key: string]: any }
  headers?: { [key: string]: any }
  body?: BodyInit | null | undefined
}

export const request = async ({ url = '', method = 'GET', query = {}, body = {}, headers = {} }) => {
  const requestArgs: IRequestArgs = {
    method,
    query,
    headers: {
      "Content-Type": "application/json",
      "auth": getCookie('auth'),
      ...headers
    }
  }
  if (!url.startsWith('/')) url = `/${url}`
  if (method == 'POST') requestArgs.body = typeof body !== 'string' ? JSON.stringify(body) : body
  const res = await fetch(`${BASE_URL}${url}`, requestArgs)
  const data = await res.json()
  const { status } = res;
  if (status == 401) return router.push({name: 'login'})
  return { status, data }
}

export const getCookie = (name: string) => {
  const cookieMatch = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
  return cookieMatch ? cookieMatch[1] : null;
}
