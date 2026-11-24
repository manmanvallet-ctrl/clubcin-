import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react()],
  // En page autonome (npm run build:artifact), les polices sont intégrées dans le CSS : il n'y a pas de dossier à côté.
  build: mode === 'artifact' ? { assetsInlineLimit: 100_000 } : {},
}))
