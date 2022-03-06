const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const nodeExternals = require("webpack-node-externals");
const merge = require("lodash.merge");
const TARGRT_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGRT_NODE ? "server" : "client";
module.exports = {
  css: {
    extract: false
  },
  outputDir: "./dist/" + target,
  configureWebpack: () => ({
    entry: `./src/entry-${target}.js`,
    devtool: "source-map",
    target: TARGRT_NODE ? "node" : "web",
    node: TARGRT_NODE ? undefined : false,
    output: {
      libraryTarget: TARGRT_NODE ? "commonjs2" : undefined
    },
    externals: TARGRT_NODE
      ? nodeExternals({
          allowlist: /\.css$/
        })
      : undefined,
    optimization: {
      splitChunks: TARGRT_NODE ? false : undefined
    },
    plugins: [TARGRT_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
  }),
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(option => {
        merge(option, {
          optimizeSSR: false
        });
      });
  },
  devServer: {
    disableHostCheck: true,
    port: "9999"
  }
};
