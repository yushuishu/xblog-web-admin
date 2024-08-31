import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import path from "path-browserify";
import {version, homepage} from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({command, mode, isSsrBuild, isPreview}) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 如果设置第三个参数为 ''，就会来加载所有环境变量，而不管是否有 `VITE_` 前缀。
    const env = loadEnv(mode, process.cwd());
    console.log('env', env);
    return {
        resolve: {
            alias: {
                '@': path.resolve('./src')
            }
        },
        // 'info' | 'warn' | 'error' | 'silent'
        logLevel: "info",
        // 定义全局常量替换方式
        define: {
            __APP_VERSION__: JSON.stringify(version),
            __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
        // 公共基础路径
        base: mode === 'build' ? homepage : '/',
        // 作为静态资源服务的文件夹。该目录中的文件在开发期间在 / 处提供，并在构建期间复制到 outDir 的根目录，并且始终按原样提供或复制而无需进行转换。
        publicDir: './public',
        server: {
            // 项目启动时，是否打开页面
            open: false,
            // 是否开启https
            https: false,
            host: "127.0.0.1",
            // 端口号，从环境变量中获取
            port: Number(env.VITE_APP_PORT),
            // 是否允许跨域
            cors: false,
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    target: env.VITE_APP_SERVICE_API,
                    changeOrigin: true,
                    rewrite: (path) => path.replace('^' + env.VITE_APP_BASE_API, ''),
                },
                '/socket.io': {
                    target: 'ws://localhost:5174',
                    ws: true,
                },
            },
        },
        build: {
            // 构建浏览器兼容目标
            target: 'es2015',
            // 构建后，是否生成source map文件
            sourcemap: false,
            // chunk 大小警告的限制（单位kb）
            chunkSizeWarningLimit: 2048,
            // gzip压缩
            reportCompressedSize: false,
            rollupOptions: {
                output: {
                    chunkFileNames: '',
                    entryFileNames: '',
                    assetFileNames: '',
                    manualChunks(id) {
                        console.log('output id:', id);
                    }
                }
            }
        },
        plugins: [
            vue(),
            // 解决 `import { ref , reactive ..... } from 'vue'` 大量引入的问题
            AutoImport({
                imports: ['vue', 'vue-router'],
            }),
        ],
        // 引入scss全局变量
        css: {
            preprocessorOptions: {
                scss: {
                    // tips: index.scss在main.js中加载过的无需再次配置 &  下面配置开启后在启动项目第一次访问时会有点慢...
                    // additionalData: `@import "@/styles/color.scss";@import "@/styles/theme.scss";`,
                },
            },
        },
    };
})