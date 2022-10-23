import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
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
        input: '.temp/src/index.js',
        output: [
            {
                file: 'dist/index.mjs',
                format: 'es',
                banner,
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
