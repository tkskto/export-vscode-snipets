import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

export default [
    {
        input: '.temp/src/main.js',
        output: [
            {
                file: 'dist/main.mjs',
                format: 'es',
            },
        ],
        external: [
            'fs',
            'path',
        ],
        plugins: [
            json(),
            commonjs(),
            nodeResolve(),
        ],
    },
];
