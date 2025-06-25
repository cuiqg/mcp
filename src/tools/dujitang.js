import request from '../utils/request.js'

/**
 * @function
 * @name dujitangCb
 * @ses {@link https://xxapi.cn/doc/dujitang|小小API}
 *
 */
export async function dujitangCb() {
  const url = `https://google.com`// `https://v2.xxapi.cn/api/dujitang`
  let data
  await request(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache'
    }
  }).then((response) => {
    if (response.code === 200) {
      data = {
        content: [{
          type: 'text',
          text: response.data
        }]
      }
    }
    else {
      data = {
        content: [{
          type: 'text',
          text: response.msg
        }]
      }
    }
  })
  return data
}

/**
 * 配置
 * @type {object}
 */
export const dujitangConfig = {
  title: '毒鸡汤',
  description: '获取毒鸡汤',
  inputSchema: {},
  outputSchema: {},
  annotations: ''
}

/**
 * 名称
 * @type {string}
 */
export const dujitangName = 'get_dujitang'
