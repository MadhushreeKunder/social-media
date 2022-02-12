import { Navigate, Route } from "react-router";
import { useAuthentication } from "../authenticationSlice";

export const PublicRoute = ({ path, ...props }) => {
  const {
    authenticate: { token },
  } = useAuthentication();
  return token ? <Navigate replace to="/" /> : <Route path={path} {...props} />;
};
