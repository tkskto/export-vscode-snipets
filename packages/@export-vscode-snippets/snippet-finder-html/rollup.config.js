import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';

export default [
    {
        input: '.temp/src/index.js',
        output: [
            {
                file: 'dist/index.mjs',
                format: 'es',
            },
        ],
        external: [
            'fs',
            'path',
            'globby',
        ],
        plugins: [
            commonjs(),
            nodeResolve(),
        ],
    },
];
