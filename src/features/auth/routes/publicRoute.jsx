import { Navigate, Route } from "react-router";
import { useAuthentication } from "../authenticationSlice";

export const PublicRoute = ({ path, ...props }) => {
  const {
    authentication: { token },
  } = useAuthentication();
  return token ? (
    <Navigate replace to="/posts" />
  ) : (
    <Route path={path} {...props} />
  );
  // return token ? <Navigate replace to="/login" /> : children;
};
