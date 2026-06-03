import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname)

/** Vite breaks when the project path contains "#" (treated as URL fragment). */
function hashInPathFix() {
  return {
    name: 'hash-in-path-fix',
    enforce: 'pre' as const,
    resolveId(id: string) {
      const bare = id.split('?')[0].split('#')[0]
      if (!bare.startsWith('/src/') && bare !== '/src/main.tsx') return null

      const relative = bare.replace(/^\//, '')
      const candidates = [
        path.join(projectRoot, relative),
        path.join(projectRoot, `${relative}.tsx`),
        path.join(projectRoot, `${relative}.ts`),
      ]

      for (const file of candidates) {
        if (fs.existsSync(file)) return file
      }
      return null
    },
  }
}

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(projectRoot, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  root: projectRoot,
  plugins: [hashInPathFix(), figmaAssetResolver(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(projectRoot, './src'),
    },
  },
  server: {
    fs: {
      strict: false,
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
