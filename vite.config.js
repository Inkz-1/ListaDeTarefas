import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ListaDeTarefas/', // <-- ESSA LINHA é essencial para GitHub Pages
  plugins: [react()],
})
