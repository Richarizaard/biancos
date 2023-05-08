import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import tsconfigPaths from 'vite-tsconfig-paths'
import dotenv from 'dotenv'

dotenv.config({ path: './.env.development.local' })

export default defineConfig({
  plugins: [RubyPlugin(), tsconfigPaths()],
  define: {
    'process.env': process.env,
  },
})
