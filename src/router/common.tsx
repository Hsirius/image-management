import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { RoutesProps } from "./index";

const RouteWithSubRoutes = (route: RoutesProps, index: number) => {
  return (
    <Route
      key={index}
      path={route.path}
      exact={route.exact}
      render={(props) => (
        <Suspense fallback={null}>
          <route.component {...props} routes={route.routes} />
        </Suspense>
      )}
    />
  );
};

export { RouteWithSubRoutes };
