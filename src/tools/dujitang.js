import { request } from '../utils.js'

/**
 * @name dujitangCb
 * @ses {@link https://xxapi.cn/doc/dujitang|小小API}
 *
 */
export async function dujitangCb() {
  const url = `https://v2.xxapi.cn/api/dujitang`
  let data
  const res = await request(url)

  if (res.error) {
    data = {
      content: [{
        type: 'text',
        text: res.error
      }]
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
        }]
      }
    }
  }

  return data
}

/**
 * 配置
 * @type {object}
 */
export const dujitangConfig = {
  title: '毒鸡汤',
  description: '每日一碗“毒鸡汤”式幽默内容'
}

/**
 * 名称
 * @type {string}
 */
export const dujitangName = 'get_dujitang'
