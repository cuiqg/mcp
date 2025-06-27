import { request } from '../utils.js'

/**
 * Register Dujitang Tool
 * @ses {@link https://xxapi.cn/doc/dujitang|小小API}
 * @returns {void}
 */
export function registerDujitangTool(server) {
  server.registerTool(
    'get_dujitang',
    {
      title: '毒鸡汤',
      description: '每日一碗“毒鸡汤”式幽默内容'
    },
    async () => {
      const url = `https://v2.xxapi.cn/api/dujitang`
      let data
      const res = await request(url, { method: 'POST', redirect: 'follow' })

      if (res.error) {
        data = {
          content: [
            {
              type: 'text',
              text: res.error
            }
          ],
          isError: true
        }
      }
      else {
        if (res.results.code === 200) {
          data = {
            content: [
              {
                type: 'text',
                text: res.results.data
              }
            ]
          }
        }
        else {
          data = {
            content: [
              {
                type: 'text',
                text: res.results.msg
              }
            ],
            isError: true
          }
        }
      }

      return data
    }
  )
}
