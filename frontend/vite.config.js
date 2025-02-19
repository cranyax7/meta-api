import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import fs from "fs";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
    port: 3000
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
