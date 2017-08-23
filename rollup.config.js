import pkg from './package.json';

export default {
  plugins: [],
  external: ['model-attributes', 'expression-expander', 'kronos-interceptor'],
  input: pkg.module,

  output: {
    format: 'cjs',
    file: pkg.main
  }
};
