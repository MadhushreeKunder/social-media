import { NavLink } from "react-router-dom";

export function Home() {
  return (
    <>
      hello world
      <header className="fixed text-center top-0 left-0 w-full z-10 items-center shadow-md bg-white">
        <div className="w-11/12 max-w-screen-xl my-0 mx-auto p-4 text-center relative flex justify-between">
          <a href="/">
            <img
              src="Images/logo1.png"
              alt="Quiz-Up"
              className="w-12 h-12"
            ></img>
          </a>
          <nav className="flex items-center justify-end relative h-auto">
            <ul className="flex items-center uppercase font-semibold">
              <li>
                <NavLink to="/" end className="ml-6 text-primaryCoral">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/login" className="ml-6 text-primaryCoral">
                  Login
                </NavLink>
              </li>

              <NavLink to="/signup" className="ml-6 text-primaryCoral">
                Sign up
              </NavLink>
              <NavLink to="/logout" className="ml-6 text-primaryCoral">
                Log out
              </NavLink>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
