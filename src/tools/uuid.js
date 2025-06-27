import { request } from '../utils.js'

/**
 * Register UUID Tool
 * @ses {@link https://xxapi.cn/doc/uuid|小小API}
 * @returns {}
 */

export function registerUuidTool(server) {
  server.registerTool(
    'get_uuid',
    {
      title: 'UUID 生成',
      description: 'UUID 生成服务'
    },
    async () => {
      const url = `https://v2.xxapi.cn/api/uuid`
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
          data = {
            content: [{
              type: 'text',
              text: res.results.data
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
