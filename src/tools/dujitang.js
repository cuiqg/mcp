import request from '../utils/request.js'

/**
 * @function
 * @name dujitangCb
 * @ses {@link https://xxapi.cn/doc/dujitang|小小API}
 *
 */
const dujitangCb = async () => {
  const url = `https://v2.xxapi.cn/api/dujitang`

  const response = await request(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache'
    }
  })

  if (response.code === 200) {
    return {
      content: [{
        type: 'text',
        text: response.data
      }]
    }
  }
  else {
    return {
      content: [{
        type: 'text',
        text: response.msg
      }]
    }
  }
}

/**
 * 配置
 * @type {import('@modelcontextprotocol/sdk/types.js').ToolSchema}
 */
const dujitangConfig = {
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
const dujitangName = 'get_dujitang'

export {
  dujitangName,
  dujitangConfig,
  dujitangCb
}
