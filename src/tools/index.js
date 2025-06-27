import { registerDujitangTool } from './dujitang.js'
import { registerHeisiTool } from './heisi.js'
import { registerJkTool } from './jk.js'
import { registerUuidTool } from './uuid.js'
import { registerIpTool } from './ip.js'
import { registerBingTool } from './bing.js'
import { registerQianTool } from './qian.js'
import { registerMeinvTool } from './meinv.js'

export function registerTools(server) {
  registerDujitangTool(server)
  registerHeisiTool(server)
  registerIpTool(server)
  registerJkTool(server)
  registerUuidTool(server)
  registerBingTool(server)
  registerQianTool(server)
  registerMeinvTool(server)
}
