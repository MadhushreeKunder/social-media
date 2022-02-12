import { Navigate, Route } from "react-router";
import { useAuthentication } from "../authenticationSlice";

export const PrivateRoute = ({ path, ...props }) => {
  const {
    authenticate: { token },
  } = useAuthentication();

  return token ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate to="/login" replace />
  );
};