import React from "react";
import "./login.css";

import { useToast } from "@chakra-ui/react";

function Login() {

  const toast = useToast();
  const loginhandler = () => {
    if (!false) {
      // insert verification outcome inplace of condition

      toast({
        title: "Incorrect details",
        description: "Incorrect username or password",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div id="login">
      <div className="background">
        <div className="lightblue"></div>
        <div className="darkblue"></div>
      </div>
      <div className="loginform">
        <div className="logo">
          <img src="logo.svg" alt="..." />
          <p>Clean. Simple. Powerful</p>
        </div>
        <div className="form">
          <form>
            <h1>Vision Web Log In</h1>
            <button type="button" className="google-signin-btn">
              <img src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button-1024x260.png" width="21"alt="google_signin" />
            </button>
            <p>OR</p>
            <input type="text" name="username" placeholder="Username..." />
            <input type="password" name="password" placeholder="Password..." />
            <input
              type="button"
              onClick={loginhandler}
              value="Login"
              id="loginbtn"
            />
            <button className="btn" onClick={(e) => e.preventDefault()}>
              Forgot Password
            </button>
            <p>To create new account</p>
            <button className="btn" onClick={(e) => e.preventDefault()}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
