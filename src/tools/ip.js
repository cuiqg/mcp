import qs from 'node:querystring'
import { z } from 'zod'
import { request } from '../utils.js'

/**
 * Register IP Tool
 * @ses {@link https://xxapi.cn/doc/ip|小小API}
 * @returns {}
 */
export function registerIpTool(server) {
  server.registerTool(
    'get_ip',
    {
      title: 'IP查询',
      description: 'IP查询服务',
      inputSchema: {
        ip: z.string().default('1.1.1.1').describe('IP 地址')
      }
    },
    async ({ ip }) => {
      const url = new URL(`https://v2.xxapi.cn/api/ip`)
      url.search = qs.encode({ ip })
      let data
      const res = await request(url.toString())

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
              text: `IP 查询结果
------------
- address: ${res.results.data.address}
- ip: ${res.results.data.ip}
- isp: ${res.results.data.isp}
- lat: ${res.results.data.lat}
- lng: ${res.results.data.lng}
-------------`
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
