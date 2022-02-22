import { Navigate, Route } from "react-router";
import { useAuthentication } from "../authenticationSlice";

export const PrivateRoute = ({ children, path, ...props }) => {
  const {
    authentication: { token },
  } = useAuthentication();

  return token ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate to="/login" replace />
  );
  // return token ? children : <Navigate replace to="/login" />;
};
