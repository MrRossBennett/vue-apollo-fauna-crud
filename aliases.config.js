const path = require('path')

function resolveSrc(_path) {
  return path.join(__dirname, _path)
}

const aliases = {
  '@': '.',
  '@assets': 'src/assets',
  '@components': 'src/components',
  '@router': 'src/router',
  '@src': 'src',
  '@store': 'src/store',
  '@utils': 'src/utils',
  '@mixins': 'src/mixins',
}

module.exports = {
  webpack: {},
  jest: {}
}

for (const alias in aliases) {
  module.exports.webpack[alias] = resolveSrc(aliases[alias])
  module.exports.jest['^' + alias + '/(.*)$'] =
    '<rootDir>/' + aliases[alias] + '/$1'
}
