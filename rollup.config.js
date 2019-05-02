import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

// 참고: https://github.com/a-tarasyuk/rollup-typescript-babel/blob/master/rollup.config.js
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],

  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({
      include: 'src/**/*',
      exclude: 'node_modules/**',
      extensions,
    }),
    postcss({ minimize: true }),
    terser(),
  ],
};
