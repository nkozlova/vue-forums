import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';

export default defineConfig({
    plugins: [pluginVue()],
    dev: {
        progressBar: true,
    },
    html: { template: './public/index.html' },
    source: {
        entry: { index: './src/index.ts' },
        decorators: {
            version: 'legacy'

        },
        define: {
            'import.meta.env.PUBLIC_SERVER' : "'http://localhost:3002'"
        }
    },
    output: {
        injectStyles: true,
        sourceMap: {
            css: true
        }
    }
});
