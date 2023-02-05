const path = require('path')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    configure: (webpackConfig) => {
      // 修改webpack配置
      whenProd(() => {
        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM',
          redux: 'Redux',
          'react-quill': 'ReactQuill',
        }
        const { isFound, match } = getPlugin(
          webpackConfig,
          pluginByName('HtmlWebpackPlugin')
        )
        if (isFound) {
          match.userOptions.cdn = {
            js: [
              'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
              'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',
              'https://cdn.jsdelivr.net/npm/redux@4.2.0/dist/redux.min.js',
              'https://unpkg.com/react-quill@2.0.0/dist/react-quill.js',
            ],
          }
        }
      })

      return webpackConfig
    },
    plugins: {
      add: [new AntdDayjsWebpackPlugin()],
    },
  },
}
