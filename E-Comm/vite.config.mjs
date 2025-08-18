import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})

// This file is already using ESM (import/export) syntax.
// No changes needed.
