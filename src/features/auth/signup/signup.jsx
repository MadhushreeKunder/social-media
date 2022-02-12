import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { signupButtonClicked, useAuthentication } from "../authenticationSlice";
import { signupFormReducer, initialFormState } from "./signup.reducer";
import { Link } from "react-router-dom";
import { MdPerson, MdLock, MdEmail, MdRemoveRedEye } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";

export const checkSignUpFormValidity = (formState, formDispatch) => {
  let errorFlag = true;

  if (
    formState.username === "" ||
    !/^[a-zA-Z]+(\s*\w*)*$/.test(formState.username)
  ) {
    formDispatch({
      type: "SET_USER_NAME_ERROR",
      payload: "Please enter valid name",
    });
    errorFlag = false;
  }

  if (formState.email === "" || !/^.+@.+\.com$/.test(formState.email)) {
    formDispatch({
      type: "SET_EMAIL_ERROR",
      payload: "Please enter email",
    });
    errorFlag = false;
  }

  if (
    formState.userName === "" ||
    !/^[a-zA-Z]+(\s*\w*)*$/.test(formState.userName)
  ) {
    formDispatch({
      type: "SET_USERNAME_ERROR",
      payload: "Please enter valid user name",
    });
    errorFlag = false;
  }

  if (
    formState.password === "" ||
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(
      formState.password
    )
  ) {
    formDispatch({
      type: "SET_PASSWORD_ERROR",
      payload:
        "Password length should contain minimum 8 characters (at least one capital, small letter and number)",
    });
    errorFlag = false;
  }
  return errorFlag;
};

const signupFormSubmit = async ({ formState, formDispatch, dispatch }) => {
  formDispatch({ type: "RESET_ERRORS" });

  if (checkSignUpFormValidity(formState, formDispatch)) {
    const signUpDetails = {
      username: formState.username,
      email: formState.email,
      userName: formState.userName,
      password: formState.password,
    };
    dispatch(signupButtonClicked(signUpDetails));
  }
};

export const SignUp = () => {
  const [formState, formDispatch] = useReducer(
    signupFormReducer,
    initialFormState
  );

  const {
    signUp: { signUpStatus, signUpError },
  } = useAuthentication();

  const dispatch = useDispatch();

  const onFocusClearError = (action) => {
    formDispatch({ type: action.type, payload: "" });
  };

  return (
    <div className="max-w-screen-xl w-full mt-32 mx-auto mb-8">
      <div className="py-12 px-16 w-max flex flex-col items-center m-auto shadow-lg rounded-lg ">
        <h1 className=" text-2xl font-semibold text-secondaryDark">SignUp</h1>{" "}
        {signUpStatus === "success" ? (
          <div>
            <h1>Please login</h1>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        ) : (
          <form
            //   onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-center align-middle my-4 mx-auto"
          >
            <div
              className="flex flex-col w-60 m-4 justify-start"
              isInvalid={!!formState.emailError}
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
              className="flex flex-col w-60 m-4 justify-start"
              isInvalid={!!formState.usernameError}
            >
              <label className="mb-2 font-medium text-slate-900 self-start">
                <MdPerson className="inline" /> Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="text-slate-900 font-medium p-2 border-2 border-gray-400 "
                required
                value={formState.username}
                onChange={(e) =>
                  formDispatch({
                    type: "SET_USER_NAME",
                    payload: e.target.value,
                  })
                }
                onFocus={() =>
                  onFocusClearError({
                    type: "SET_USER_NAME_ERROR",
                    payload: "",
                  })
                }
              />
              <p>{formState.usernameError}</p>
            </div>

            <div
              className="flex flex-col w-60 m-4 justify-start"
              isInvalid={!!formState.userNameError}
            >
              <label className="mb-2 font-medium text-slate-900 self-start">
                <MdPerson className="inline" /> Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="text-slate-900 font-medium p-2 border-2 border-gray-400 "
                required
                value={formState.userName}
                onChange={(e) =>
                  formDispatch({
                    type: "SET_USERNAME",
                    payload: e.target.value,
                  })
                }
                onFocus={() =>
                  onFocusClearError({
                    type: "SET_USERNAME_ERROR",
                    payload: "",
                  })
                }
              />
              <p>{formState.userNameError}</p>
            </div>

            <div
              className="flex flex-col w-60 m-4 justify-start"
              isInvalid={!!formState.passwordError}
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
                  formDispatch({
                    type: "SET_PASSWORD",
                    payload: e.target.value,
                  })
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
                signupFormSubmit({ formState, formDispatch, dispatch });
              }}
            >
              Sign Up
            </button>

            {signUpStatus === "error" && <div>{signUpError}</div>}

            <small className="text-lg text-secondaryDark">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-primaryCoral hover:underline">
                  Login!
                </span>
              </Link>
            </small>
          </form>
        )}
      </div>
    </div>
  );
};
