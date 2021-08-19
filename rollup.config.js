import glob from 'glob';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';

export default [
  ...glob.sync('modules/**/*.ts').
    .map(path => {
      if(path.endsWith('/index.ts'))
        return {
          input: path,
          output: [
            {
              file: path.replace(/\/index.ts$/, '.esm.js'),
              format: 'esm',
            },
            {
              file: path.replace(/\/index.ts$/, '.js'),
              format: 'cjs',
            }
          ],
          plugins: [
            resolve(),
            commonjs(),
            typescript()
          ]
        }
      return {
          input: path,
          output: [
            {
              file: path.replace(/.ts$/, '.esm.js'),
              format: 'esm',
            },
            {
              file: path.replace(/.ts$/, '.js'),
              format: 'cjs',
            }
          ],
          plugins: [
            resolve(),
            commonjs(),
            typescript()
          ]
        }
    })
]
