import { createBrowserHistory } from "history";
import React from "react";
import { Router, Switch } from "react-router-dom";
import routes, { RoutesProps } from "./router";
import RouteWithSubRoutes from "./router/common";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("en");

const history = createBrowserHistory();

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          {routes.map((route: RoutesProps, i: number) => {
            return RouteWithSubRoutes(route, i);
          })}
        </Switch>
      </Router>
    </ConfigProvider>
  );
};

export default App;
