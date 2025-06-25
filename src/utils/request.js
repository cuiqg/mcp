import process from 'node:process'
import { ofetch } from 'ofetch'
import { ProxyAgent } from 'undici'

export async function request(url, options = {}) {
  const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY

  if (proxy) {
    options.dispatcher = new ProxyAgent(proxy)
  }

  await ofetch(url, options)
}
