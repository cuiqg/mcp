import { request, imageToBase64 } from '../utils.js'

/**
 * Register Heisi Tool
 * @ses {@link https://xxapi.cn/doc/heisi|小小API}
 * @returns {void}
 */
export function registerHeisiTool(server) {
  server.registerTool(
    'get_heisi',
    {
      title: '随机黑丝图片',
      description: '随机返回黑色丝袜图片'
    }, async () => {
      const url = `https://v2.xxapi.cn/api/heisi`
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
