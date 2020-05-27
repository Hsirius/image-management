const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addWebpackPlugin,
  useEslintRc,
} = require("customize-cra");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  webpack: override(
    fixBabelImports("antd", {
      //配置按需加载
      libraryDirectory: "es",
      style: true,
    }),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
      },
    }),
    addWebpackAlias({
      //路径别名
      "@": path.resolve(__dirname, "src"),
    }),
    addWebpackPlugin(
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "public/index.html",
      })
    ),
    useEslintRc(".eslintrc.js")
  ),
};
