import { request, imageToBase64 } from '../utils.js'

/**
 * Register JK Tool
 * @ses {@link https://xxapi.cn/doc/jk|小小API}
 * @returns {void}
 */
export function registerJkTool(server) {
  server.registerTool(
    'get_jk',
    {
      title: '随机 Joshi Kōsei 制服图片',
      description: '随机返回高质量 Joshi Kōsei 制服图片'
    },
    async () => {
      const url = `https://v2.xxapi.cn/api/jk`
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
    }
  )
}
