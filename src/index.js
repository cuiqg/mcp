#!/usr/bin/env node

import process from 'node:process'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  dujitang,
  uuid,
  heisi,
  jk
} from './tools/index.js'

async function main() {
  const server = new McpServer({
    name: 'cuiqg-mcp',
    version: '1.0.0',
    description: 'Tsuiqg\'s MCP Server'
  })

  server.registerTool(
    dujitang.name,
    dujitang.config,
    async () => {
      return await dujitang.cb()
    }
  )

  server.registerTool(
    heisi.name,
    heisi.config,
    async () => {
      return await heisi.cb()
    }
  )

  server.registerTool(
    jk.name,
    jk.config,
    async () => {
      return await jk.cb()
    }
  )

  server.registerTool(
    uuid.name,
    uuid.config,
    async () => {
      return await uuid.cb()
    }
  )

  const transport = new StdioServerTransport()
  await server.connect(transport)
  // eslint-disable-next-line no-console
  console.log('Cuiqg MCP Server runing on stdio')
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
