import { request } from '../utils.js'

/**
 * 回调函数
 * @ses {@link https://xxapi.cn/doc/uuid|小小API}
 * @returns {Promise<{content: [{type: string, text: string}], isError: boolean}>}
 *
 */
const cb = async () => {
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

/**
 * 配置
 * @type {object}
 */
const config = {
  title: 'uuid生成',
  description: 'UUID生成服务'
}

/**
 * 名称
 * @type {string}
 */
const name = 'get_uuid'

export const uuid = { config, name, cb }
