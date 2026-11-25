import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        ['index', 'proyectos', 'servicios', 'quienes_somos', 'contacto']
          .map(name => [name, resolve(import.meta.dirname, name + '.html')])
      )
    }
  }
})
