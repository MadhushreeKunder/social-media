export const initialFormState = {
  email: "",
  username: "",
  userName: "",
  password: "",
  showPassword: false,
  emailError: "",
  usernameError: "",
  userNameError: "",
  passwordError: "",
};

export const signupFormReducer = (formState, action) => {
  switch (action.type) {
    case "SET_EMAIL": {
      return { ...formState, email: action.payload };
    }
    case "SET_USERNAME": {
      return { ...formState, userName: action.payload };
    }
    case "SET_USER_NAME": {
      return { ...formState, username: action.payload };
    }
    case "SET_PASSWORD": {
      return { ...formState, password: action.payload };
    }
    case "SHOW_PASSWORD": {
      return { ...formState, showPassword: !formState.showPassword };
    }
    case "SET_EMAIL_ERROR": {
      return { ...formState, emailError: action.payload };
    }
    case "SET_USERNAME_ERROR": {
      return { ...formState, userNameError: action.payload };
    }
    case "SET_USER_NAME_ERROR": {
      return { ...formState, usernameError: action.payload };
    }
    case "SET_PASSWORD_ERROR": {
      return { ...formState, passwordError: action.payload };
    }
    case "RESET_ERRORS": {
      return {
        ...formState,
        emailError: "",
        usernameError: "",
        userNameError: "",
        passwordError: "",
      };
    }
    default:
      throw Error("Invalid Action");
  }
};
