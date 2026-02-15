import { createClient, defaultPlugins } from 'villus'

const parseCookieHeader = (value?: string) => {
  return (value || '')
    .split(';')
    .reduce((out: Record<string, string>, part) => {
      const pair = part.split('=')
      if (pair[0] && pair[1]) {
        out[pair[0].trim()] = pair[1].trim()
      }
      return out
    }, {})
}

const addHeadersPlugin = (cookie?: string) => ({ opContext }: { opContext: RequestInit }) => {
  ;(opContext as RequestInit & { credentials?: string }).credentials = 'include'
  if (cookie) {
    const cookiesParsed = parseCookieHeader(cookie)
    if (cookiesParsed.jwt) {
      opContext.headers = opContext.headers || ({} as Record<string, string>)
      ;(opContext.headers as Record<string, string>).Authorization = `Bearer ${cookiesParsed.jwt}`
    }
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const cookie = nuxtApp.ssrContext?.event?.req?.headers?.cookie
  const client = createClient({
    url: config.public.baseUrl || 'http://localhost:3002/graphql',
    use: [addHeadersPlugin(cookie), ...defaultPlugins()]
  })
  nuxtApp.vueApp.use(client)
})
