import { NavLink } from "react-router-dom";
import {
  MdHomeFilled,
  MdAccountCircle,
  MdNotifications,
  MdOutlineAddCircle,
} from "react-icons/md";

export function Header() {
  return (
    <>
      <header className="fixed text-center top-0 left-0 w-full z-10 items-center shadow-md bg-white">
        <div className="w-11/12 max-w-screen-xl my-0 mx-auto p-4 text-center relative flex justify-between items-center">
          <a href="/">
            <img
              src="Images/logo2.png"
              alt="Quiz-Up"
              className="w-12 h-12"
            ></img>
          </a>
          <nav className="relative h-auto">
            <ul className="flex items-center uppercase font-semibold text-2xl">
              <li className="flex items-center">
                <NavLink to="/posts" end className="ml-6 text-primaryCoral">
                  <MdHomeFilled />
                </NavLink>
              </li>

              <li className="flex items-center">
                <NavLink to="/login" className="ml-6 text-primaryCoral">
                  <MdAccountCircle />
                </NavLink>
              </li>

              <li className="flex items-center">
                <NavLink to="/signup" className="ml-6 text-primaryCoral">
                  <MdOutlineAddCircle />
                </NavLink>
              </li>

              <li className="flex items-center">
                <NavLink to="/logout" className="ml-6 text-primaryCoral">
                  <MdNotifications />
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
