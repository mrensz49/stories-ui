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
                manifest: {
                    name: 'storiesforyou',
                    short_name: 'storiesforyou',
                    description: "When you read an online story, you're not just reading it on your own. You're joining a community of readers and authors who are passionate about stories. You can share your thoughts on the story with other readers, and you can even leave comments for the story.",
                    theme_color: '#f5ecbc',
                    icons: [
                      {
                        src: '/public/img/icons/android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                      },
                      {
                        src: '/public/img/icons/android-chrome-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
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
