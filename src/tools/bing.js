import { request, imageToBase64 } from '../utils.js'

/**
 * Register Bing Wrapper Tool
 * @ses {@link https://xxapi.cn/doc/bing|小小API}
 * @param {import('@modelcontextprotocol/sdk/types.js')} server
 * @returns {void}
 */
export function registerBingTool(server) {
  server.registerTool(
    'get_bing',
    {
      title: 'BING 每日一图',
      description: '获取 Bing 每日一图'
    }, async () => {
      const url = `https://v2.xxapi.cn/api/bing`
      let data
      const res = await request(url)

      if (res.error) {
        data = {
          content: [{
            type: 'text',
            text: res.error
          }],
          isError: true
        }
      }
      else {
        if (res.results.code === 200) {
          const img = await imageToBase64(res.results.data)
          data = {
            content: [{
              type: 'image',
              data: img.base64,
              mimeType: img.contentType
            }]
          }
        }
        else {
          data = {
            content: [{
              type: 'text',
              text: res.results.msg
            }],
            isError: true
          }
        }
      }

      return data
    })
}
