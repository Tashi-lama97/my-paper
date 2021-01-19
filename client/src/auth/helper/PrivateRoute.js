import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAutheticated() && isAutheticated().user.verified) {
          return <Component {...props} />;
        } else if (isAutheticated() && !isAutheticated().user.verified) {
          return (
            <Redirect
              to={{
                pathname: "/emailverificationerror",
                state: { from: props.location },
              }}
            />
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
// isAutheticated() ? (
//
//   ) : (
//     <Redirect
//       to={{
//         pathname: "/signin",
//         state: { from: props.location },
//       }}
//     />
//   )
