/**
 * @type {import('svbuild/types').Config}
 */
const config = {
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

export default config