import { NavLink } from "react-router-dom";
import {
  MdHomeFilled,
  MdAccountCircle,
  MdNotifications,
  MdOutlineAddCircle,
} from "react-icons/md";
import { useAuthentication } from "../auth/authenticationSlice";

export function Header() {
  const {
    authentication: { userName, avatar },
  } = useAuthentication();
  return (
    <>
      <header className="fixed text-center top-0 left-0 w-full z-10 items-center shadow-md bg-white">
        <div className="w-11/12 max-w-screen-lg my-0 mx-auto p-4 text-center relative flex justify-between items-center">
          <a href="/">
            <img
              src="Images/logo2.png"
              alt="Coral-gram"
              className="w-12 h-12"
            ></img>
          </a>
          <nav className="relative h-auto">
            <ul className="flex items-center uppercase font-semibold text-2xl">
              <li className="flex items-center">
                <NavLink to="/" end className="ml-6 text-mediumGray">
                  <MdHomeFilled />
                </NavLink>
              </li>

              {/* <li className="flex items-center">
                <NavLink to="/signup" className="ml-6 text-mediumGray">
                  <MdOutlineAddCircle />
                </NavLink>
              </li> */}

              <li className="flex items-center">
                <NavLink to="/" className="ml-6 text-mediumGray">
                  <MdNotifications />
                </NavLink>
              </li>

              <li className="flex items-center">
                <NavLink
                  to={`/profile/${userName}`}
                  className="ml-6 text-mediumGray"
                >
                  <MdAccountCircle />
                </NavLink>
              </li>

              <NavLink to="/signup"> Sign up</NavLink>

              <NavLink to="/login">login</NavLink>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
