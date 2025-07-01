import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
import { config } from 'dotenv'

config()

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@renderer': resolve('src/renderer/src')
            }
        },
        plugins: [
            react(),
            createHtmlPlugin({
                inject: {
                    data: {
                        VITE_API_CSP:
                            process.env.VITE_API_BASE_URL?.replace('/api', '') ||
                            'http://127.0.0.1:8000',
                        VITE_APP_NAME: process.env.VITE_APP_NAME || 'MyReactApp'
                    }
                }
            })
        ],
        server: {
            host: '0.0.0.0',
            port: 5173
        }
    }
})
