const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
// 创建渲染器
const { createBundleRenderer } = require("vue-server-renderer");
const serverBundle = require("../dist/server/vue-ssr-server-bundle.json");
const clientManifest = require("../dist/client/vue-ssr-client-manifest.json");
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync(
    path.join(__dirname, "../public/index.temp.html"),
    "utf-8"
  ),
  clientManifest
});
// 设置静态文件
app.use(express.static("../dist/client", { index: false }));
app.get("*", async (req, res) => {
  try {
    const context = {
      url: req.url,
      title: "ssr"
    };
    const html = await renderer.renderToString(context);
    res.send(html);
  } catch (error) {
    console.log(error);
    res.send("渲染出错了");
  }
});
app.listen(9999, function() {
  console.log("服务运行在8080端口");
});
