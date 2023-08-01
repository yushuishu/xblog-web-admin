import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { homepage } from './package.json';


// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    const root = process.cwd();
    const env = loadEnv(mode, root);
    console.log('env', env);
    return {
        base: mode === 'build' ? homepage : '/',
        publicDir: './public',
        server: {
            proxy: {
                'dev': {
                    target: env.VITE_BASE_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/dev/, ''),
                },
                '/socket.io': {
                    target: 'ws://localhost:5174',
                    ws: true,
                },
            },
        },
        resolve: {
            alias: {
                // 键必须以斜线开始和结束
                '@': path.resolve(__dirname, './src')
            }
        },
        plugins: [
            vue(),
            // ElementPlus({
            //   useSource: true
            // })
        ]
    };
})