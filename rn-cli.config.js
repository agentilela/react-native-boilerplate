const path = require('path')
const blacklist = require('metro/src/blacklist')

module.exports = {
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer')
  },
  getSourceExts() {
    return ['ts', 'tsx']
  },
  getProjectRoots() {
    return [path.resolve(__dirname), path.resolve(__dirname, 'app')]
  },
  getBlacklistRE() {
    // https://github.com/oblador/react-native-vector-icons/issues/626
    // https://github.com/facebook/react-native/issues/17610
    return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/])
  }
}
