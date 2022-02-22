import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { loginFormReducer, initialFormState } from "./login.reducer";
import { loginButtonClicked } from "../authenticationSlice";
import { MdPerson, MdLock, MdEmail, MdRemoveRedEye } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const checkLoginFormValidity = (formState, formDispatch) => {
  let errorFlag = true;

  if (formState.email === "" || !/^.+@.+\.com$/.test(formState.email)) {
    formDispatch({
      type: "SET_EMAIL_ERROR",
      payload: "Please enter valid email id",
    });
    errorFlag = false;
  }
  if (formState.password === "") {
    formDispatch({
      type: "SET_PASSWORD_ERROR",
      payload: "Please enter password",
    });
    errorFlag = false;
  }
  return errorFlag;
};

export const Login = () => {
  const [formState, formDispatch] = useReducer(
    loginFormReducer,
    initialFormState
  );

  const dispatch = useDispatch();

  const onFocusClearError = (action) => {
    formDispatch({ type: action.type, payload: "" });
  };

  const loginUser = async (formState) => {
    formDispatch({ type: "RESET_ERRORS" });
    if (checkLoginFormValidity(formState, formDispatch)) {
      formDispatch({ type: "SET_STATUS", payload: "loading" });
      const dispatchResponse = await dispatch(
        loginButtonClicked({
          email: formState.email,
          password: formState.password,
        })
      );

      if (dispatchResponse.meta.requestStatus === "rejected") {
        formDispatch({
          type: "SET_API_ERROR",
          payload: dispatchResponse.payload,
        });
      }
    }
  };

  return (
    <div className="max-w-screen-xl w-full mt-32 mx-auto">
      <div className="py-12 px-16 w-max flex flex-col items-center m-auto shadow-lg rounded-lg ">
        <h2 className=" text-3xl font-semibold text-secondaryDark">Login</h2>
        {/* <h3 className="fixed z-10 pt-40  top-0  h-full overflow-auto bg-opacity-10">
        {(
          <img src="/Images/loading.svg" alt="loading" />
        )}
      </h3> */}
        <form
            onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center align-middle my-4 mx-auto"
        >
          <div
            className="flex flex-col w-60 m-4 justify-start"
            // isInvalid={!!formState.emailError}
          >
            <label className="mb-2 font-medium text-slate-900 self-start">
              <MdEmail className="inline" /> Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="text-slate-900 font-medium p-2 border-2 border-gray-400 "
              required
              value={formState.email}
              onChange={(e) =>
                formDispatch({ type: "SET_EMAIL", payload: e.target.value })
              }
              onFocus={() =>
                onFocusClearError({
                  type: "SET_EMAIL_ERROR",
                  payload: "",
                })
              }
            />
            <p>{formState.emailError}</p>
          </div>

          <div
            className="flex flex-col w-60 m-4 justify-start relative"
            // isInvalid={!!formState.passwordError}
          >
            <label className="mb-2 font-medium text-slate-900 self-start">
              <MdLock className="inline" /> Password
            </label>
            <input
              type={formState.showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="text-slate-900 font-medium p-2 border-2 border-gray-400 "
              required
              value={formState.password}
              onChange={(e) =>
                formDispatch({ type: "SET_PASSWORD", payload: e.target.value })
              }
              onFocus={() =>
                onFocusClearError({
                  type: "SET_PASSWORD_ERROR",
                  payload: "",
                })
              }
            />
            <button
              className="text-slate-900 absolute right-3 top-11"
              onClick={() => formDispatch({ type: "SHOW_PASSWORD" })}
            >
              {formState.showPassword ? <MdRemoveRedEye /> : <FaEyeSlash />}{" "}
            </button>

            <p>{formState.passwordError}</p>
          </div>

          <button
            className="py-2 px-4 m-4 block w-fit rounded-lg bg-primaryCoral shadow-lg active:shadow-gray-300 text-white font-bold"
            onClick={() => {
              formDispatch({
                type: "SET_EMAIL",
                payload: "test@test.com",
              });
              formDispatch({
                type: "SET_PASSWORD",
                payload: "Test#1234",
              });
              loginUser({ email: "test@test.com", password: "Test#1234" });
            }}
          >
            Login with Test Credentials
          </button>

          <button
            className="py-2 px-4 m-4 block w-fit rounded-lg bg-primaryCoral shadow-lg active:shadow-gray-300 text-white font-bold"
            onClick={() => {
              loginUser(formState);
            }}
          >
            Login
          </button>

          {formState.status === "error" && <div>{formState.apiError}</div>}

          <small className="text-lg text-secondaryDark">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="text-primaryCoral hover:underline">
                {" "}
                Sign up!
              </span>
            </Link>
          </small>
          <div className="fixed z-10 pt-40  top-5  h-full overflow-auto bg-opacity-10">
            {formState.loading && (
              <img src="/Images/loading.svg" alt="Loading" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
