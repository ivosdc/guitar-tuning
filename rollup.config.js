import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';

const pkg = require('./package.json');

export default {
    input: [
        'src/index.js'
    ],
    output: [
        {file: pkg.module, format: 'iife', name: 'GuitarTuning'},
        {file: pkg.main, format: 'iife', name: 'GuitarTuning'},
    ],
    plugins: [
        svelte({
            customElement: true,
            tag: 'guitar-tuning',
            emitCss: true,
            css: (css) => {
                css.write('dist/build/guitar-tuning.css');
            }
        }),
        resolve({
                extensions: ['.svelte', '.mjs', '.js', '.jsx', '.json'],
                mainFields: ['jsnext:main', 'module', 'main']
            }
        )
    ]
};
