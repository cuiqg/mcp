import { request } from '../utils.js'

/**
 * 回调函数
 * @ses {@link https://xxapi.cn/doc/dujitang|小小API}
 * @returns {Promise<{content: [{type: string, text: string}], isError: boolean}>}
 */
const cb = async () => {
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

/**
 * 配置
 * @type {object}
 */
const config = {
  title: '毒鸡汤',
  description: '每日一碗“毒鸡汤”式幽默内容'
}

/**
 * 名称
 * @type {string}
 */
const name = 'get_dujitang'

export const dujitang = {
  name,
  config,
  cb
}
