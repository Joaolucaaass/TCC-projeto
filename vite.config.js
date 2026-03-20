import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:      resolve(__dirname, 'index.html'),
        login:     resolve(__dirname, 'login.html'),
        scoutLive: resolve(__dirname, 'scout-live.html'),
        jogos:     resolve(__dirname, 'jogos.html'),
        atletas:   resolve(__dirname, 'atletas.html'),
        perfil:    resolve(__dirname, 'perfil.html'),
      }
    }
  }
})