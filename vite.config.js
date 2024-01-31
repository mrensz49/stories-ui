import path from "path";
import {defineConfig, loadEnv} from "vite";
import {createVuePlugin} from "vite-plugin-vue2";
import Components from 'unplugin-vue-components/vite'
import {VuetifyResolver} from "unplugin-vue-components/resolvers";
import { VitePWA } from 'vite-plugin-pwa'

const HOST = "0.0.0.0"
const REPLACEMENT = `${path.resolve(__dirname, './src')}/`
const env = loadEnv(
    'all',
    process.cwd()
);
let port = env.VITE_NODE_ENV;

export default () => {
    return defineConfig({
        base: env.VITE_NODE_ENV == 'development' ? "./" : env.VITE_BASE_URL,
        server: {
            host: HOST,
        },
        resolve: {
            extensions: ['.vue', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
            alias: [
                {
                    find: '@/',
                    replacement: REPLACEMENT,
                },
                {
                    find: 'src/',
                    replacement: REPLACEMENT,
                },
            ],
        },
        plugins: [
            VitePWA({ 
                registerType: 'autoUpdate',
                background_color: '#2178FF',
                workbox: {
                    globPatterns: ['**/*.{js,css,html,ico,png,svg}']
                },                
                manifest: {
                    name: 'storiesforyou',
                    short_name: 'storiesforyou',
                    description: "When you read an online story, you're not just reading it on your own. You're joining a community of readers and authors who are passionate about stories. You can share your thoughts on the story with other readers, and you can even leave comments for the story.",
                    theme_color: '#2178FF',
                    background_color: '#2178FF',
                    icons: [
                    {
                        src: '/img/icons/screen-shot-320x320.png',
                        sizes: '320x320',
                        type: 'image/png',
                        purpose: 'any'
                        },
                    {
                        src: '/img/icons/android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any'
                      },
                      {
                        src: '/img/icons/screen-shot-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any',
                      }
                    ],
                    "screenshots": [
                        {
                            "src": "/img/icons/android-chrome-1000x750.png",
                            "sizes": "1000x750",
                            "type": "image/png",
                            "form_factor": "wide",
                            "label": "Reading is life, too."
                        },   
                        {
                            "src": "/img/icons/screen-shot-512x512.png",
                            "sizes": "512x512",
                            "type": "image/png",
                            "label": "Reading is life, too."
                        },                        
                        {
                            "src": "/img/icons/screen-shot-320x320.png",
                            "sizes": "320x320",
                            "type": "image/png",
                            "label": "Reading is life, too."
                        }
                    ]                    
                  }                 
            }),
            createVuePlugin(),
            Components({
                resolvers: [
                    VuetifyResolver(),
                ],
            })
        ],
        css: {
            preprocessorOptions: {
                sass: {
                    additionalData: "\n@import '@/scss/style.scss'\n",
                },
            },
        },
        build: {
            outDir: '../for_production/storiesforyou/'
        },
    })
}