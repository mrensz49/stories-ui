import path from "path";
import {defineConfig, loadEnv} from "vite";
import {createVuePlugin} from "vite-plugin-vue2";
import Components from 'unplugin-vue-components/vite'
import {VuetifyResolver} from "unplugin-vue-components/resolvers";

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
