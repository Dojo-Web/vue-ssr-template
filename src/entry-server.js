//首屏渲染
import createApp from "./app";
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    router.push(context.url);
    router.onReady(() => {
      let matchedComponents = router.getMatchedComponents();
      // if (!matchedComponents.length) {
      //   reject({ code: 400 });
      // }
      // 对所有匹配的路由组件调用 asyncData
      Promise.all(matchedComponents.map(component => {
          if (component.async) {
            return component.asyncData({ store, router: router.currentRoute });
          }
        })
      )
        .then(() => {
          // 在所有预取钩子 resolve后， store已经填充渲染应用程序所需的状态
          // 将状态附加到上下文
          // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
          context.state = store.state;
          resolve(app);
        })
        .catch(reject);
      if (!matchedComponents.length) {
        context.state = store.state;
        resolve(app);
      }
    }, reject);
  });
};
