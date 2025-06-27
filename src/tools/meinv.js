import { request, imageToBase64 } from '../utils.js'

/**
 * Register Meinv Pic Tool
 * @ses {@link https://xxapi.cn/doc/meinvpic|小小API}
 * @returns {void}
 */
export function registerMeinvTool(server) {
  server.registerTool(
    'get_meinv',
    {
      title: '随机小姐姐图片',
      description: '各种风格的美女图片'
    }, async () => {
      const url = `https://v2.xxapi.cn/api/meinvpic`
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
