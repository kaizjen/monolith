export default {
  src: './$src',
  out: './js',
  compilerOptions: {
    esm: true,
    dev: true,
    sveltePath: 'mth://.svelte'
  },
  moduleOptions: {
    root: './js/modules',
    buildModules: true,
    buildSvelte: false,
    modulesSrc: 'node_modules'
  }
}