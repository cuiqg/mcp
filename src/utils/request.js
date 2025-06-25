import process from 'node:process'
import { ofetch } from 'ofetch'
import { ProxyAgent } from 'undici'

/**
 * 请求
 *
 * @see {@link https://ofetch.unjs.io/|UnJS}
 * @param {string} url - 请求URL
 * @param {object} [options={}] - 请求选项
 * @returns {Promise<object>}
 */
export default async (url, options = {}) => {
  const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY

  if (proxy) {
    options.dispatcher = new ProxyAgent(proxy)
  }

  const fetchOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache'
    },
    async onRequest({ request, options }) {
    },
    async onRequestError({ request, options, error }) {
      console.error('[fetch request error]', options, request, error)
    },
    async onResponse({ request, response, options }) {
    },
    async onResponseError({ request, options, response }) {
      console.error(
        '[fetch response error]',
        request,
        options,
        response.status,
        response.body
      )
    },
    ignoreResponseError: true,
    ...options
  }

  return await ofetch(url, fetchOptions)
}
