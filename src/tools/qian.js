import { request, imageToBase64 } from '../utils.js'

/**
 * Register WenChangDiJun Tool
 * @ses {@link https://xxapi.cn/doc/wenchangdijunrandom|小小API}
 * @param {import('@modelcontextprotocol/sdk/server/mcp.js').McpServer} server
 * @returns {void}
 */
export function registerQianTool(server) {
  server.registerTool(
    'get_qian',
    {
      title: '随机黑文昌帝君灵签',
      description: '文昌帝君抽签'
    }, async () => {
      const url = `https://v2.xxapi.cn/api/wenchangdijunrandom`
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
          const img = await imageToBase64(res.results.data.pic)
          data = {
            content: [{
              type: 'image',
              data: img.base64,
              mimeType: img.contentType
            },
            {
              type: 'text',
              text: `${res.results.data.title}
======【签诗】=======
${res.results.data.poem}
======【解签】=======
${res.results.data.content}
=====================`
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
