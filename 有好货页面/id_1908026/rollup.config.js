// 将 CommonJS 转换成 ES2015 模块
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';
// 告诉 Rollup 如何查找外部模块
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';

const isProd = process.env.NODE_ENV === 'production';
const config = {
  input: './src/index.js',
  output: {
    file: 'dist/index.js',
    name: 'index',
    format: 'iife',
  },
  sourcemap: isProd ? false : 'inline',
  watch: isProd
    ? false
    : {
        include: 'src/**',
      },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**', // Default: undefined
      exclude: ['node_modules/foo/**', 'node_modules/bar/**'], // Default: undefined
      // these values can also be regular expressions
      // include: /node_modules/

      // search for files other than .js files (must already
      // be transpiled by a previous plugin!)
      extensions: ['.js', '.coffee'], // Default: [ '.js' ]

      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false, // Default: false

      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: false, // Default: true

      // explicitly specify unresolvable named exports
      // (see below for more details)
      namedExports: { react: ['createElement', 'Component'] }, // Default: undefined

      // sometimes you have to leave require statements
      // unconverted. Pass an array containing the IDs
      // or a `id => boolean` function. Only use this
      // option if you know what you're doing!
      ignore: ['conditional-runtime-dependency'],
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**', // 只编译我们的源代码
    }),
    scss(),
    // terser(),
    json(),
  ],
};

if (isProd) {
  config.plugins.push(terser());
}

export default config;
