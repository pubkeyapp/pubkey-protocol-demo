import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import type { UserConfig } from 'vite'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node',
    exclude: ['node_modules', 'tmp'],
    globals: true,
    reporters: ['verbose'],
  },
} as UserConfig)
