import { Buffer } from 'node:buffer'
import { fetch, EnvHttpProxyAgent } from 'undici'

/**
 * 请求
 *
 * @see {@link https://ofetch.unjs.io/|UnJS}
 * @param {string} url - 请求URL
 * @param {object} [options={}] - 请求选项
 * @returns {Promise<object>}
 */
export async function request(url, options = {}) {
  const envHttpProxyAgent = new EnvHttpProxyAgent()

  const fetchOptions = {
    method: 'GET',
    dispatcher: envHttpProxyAgent,
    redirect: 'follow',
    ...options
  }
  try {
    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      console.error(`[Fetch ${response.url} error]:`, response.error())

      return {
        results: [],
        error: `[Fetch ${response.url} error]: ${response.error()}`
      }
    }

    return {
      results: await response.json(),
      error: null
    }
  }
  catch (error) {
    console.error('[Fetch error]:', error)
    return {
      results: [],
      error: `[Fetch error]: ${error}`
    }
  }
}

export async function imageToBase64(url) {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      console.error(`[Image to base64 error]:`, response.error())

      throw new Error(`[Image to base64 error]: ${response.error()}`)
    }
    const buffer = await response.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')

    const contentType = response.headers.get('content-type')
    // const dataUrl = `data:${contentType};base64,${base64}`

    return {
      contentType,
      base64
    }
  }
  catch (error) {
    console.error('[Image to base64 error]:', error)
    throw error
  }
}
