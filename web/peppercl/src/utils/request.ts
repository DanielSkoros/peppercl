import router from '@/router'
import type { NavigationFailure } from 'vue-router'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export interface IRequestArgs {
  method?: string
  query?: { [key: string]: any }
  headers?: { [key: string]: any }
  body?: BodyInit | null | undefined | FormData
}

interface IRequestResponse {
  status: number
  data: any
}

export const request = async ({
  url = '',
  method = 'GET',
  query = {},
  body = null,
  headers = {},
  isFileUpload = false
}): Promise<IRequestResponse | void | NavigationFailure | undefined> => {
  const requestArgs: IRequestArgs = {
    method,
    headers: {
      auth: getCookie('auth'),
      ...headers
    }
  }
   if (!isFileUpload && !headers['Content-Type']) {
    headers['Content-Type'] = "application/json"
   }
  console.log(typeof body)
  if (!url.startsWith('/')) url = `/${url}`
  if (Object.keys(query).length) {
    const parsedQuery = new URLSearchParams(query)
    url += `?${parsedQuery}`
  }
  if (method == 'POST' && body) requestArgs.body = body
  const res = await fetch(`${BASE_URL}${url}`, requestArgs)
  const data = await res.json()
  const { status } = res
  if (status == 401) return router.push({ name: 'login' })
  return { status, data }
}

export const getCookie = (name: string) => {
  const cookieMatch = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)'))
  return cookieMatch ? cookieMatch[1] : null
}
