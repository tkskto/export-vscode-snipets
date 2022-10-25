import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import pkg from './package.json' assert {type: 'json'};

let dependencies = '';

for (const name in pkg.dependencies) {
    if (Object.prototype.hasOwnProperty.call(pkg.dependencies, name)) {
        dependencies += `    ${name} -- ${pkg.dependencies[name]}\n`;
    }
}

const banner = `/*!
  ${pkg.name} v${pkg.version}
  ${pkg.author.url}
  Released under the ${pkg.license} License.
  See LICENSE.txt for full license.
  dependencies: 
    ${dependencies.trim()}
*/`;

export default [
    {
        input: '.temp/src/main.js',
        output: [
            {
                file: 'dist/main.mjs',
                format: 'es',
                banner,
            },
        ],
        external: [
            'fs',
            'path',
            'url',
        ],
        plugins: [
            json(),
            commonjs(),
            nodeResolve(),
        ],
    },
];
