import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet'

export default defineConfig({
  plugins: [
    iconsSpritesheet({
      inputDir: './icons',
      outputDir: './app/ui/icons',
      formatter: 'prettier',
      withTypes: true,
    }),
    reactRouter(),
    tsconfigPaths(),
  ],
})
