import Module from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { defineConfig } from 'tsdown'

const require = Module.createRequire(import.meta.url)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  entry: ['src/index.js'],
  outDir: 'build',
  format: ['esm'],
  dts: false,
  shims: true,
  clean: true,
  platform: 'node',
  onSuccess: async () => {
    const fs = require('node:fs')
    const path = require('node:path')
    const outputDir = path.resolve(__dirname, 'build')
    try {
      const files = fs.readdirSync(outputDir)

      files.forEach((file) => {
        if (path.extname(file) === '.js') {
          const filePath = path.join(outputDir, file)
          fs.chmodSync(filePath, 755) // 修改为可读、写、执行权限
          console.warn(`已修改文件权限: ${filePath}`)
        }
      })
    }
    catch (error) {
      console.error(`修改文件权限时出错: ${error.message}`)
      throw error
    }
  }
})
