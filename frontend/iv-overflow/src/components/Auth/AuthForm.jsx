import { useRef, useEffect, Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { authActions } from "../../store/slices/auth-slice";
import useHTTP from "../../hooks/useHTTP";
import Button from "../UI/Button";

const AuthForm = () => {
  const [loginPage, setLoginPage] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const match = useMatch("/login");
  const { isLoading, error, sendRequest } = useHTTP();
  const emailRef = useRef();
  const passwordRef = useRef();
  const fullNameRef = useRef();
  const nickNameRef = useRef();

  useEffect(() => {
    if (match) {
      setLoginPage(true);
    } else {
      setLoginPage(false);
    }
  }, [match]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    let url = "http://localhost:8080/login";
    if (!loginPage) {
      data = {
        ...data,
        nickName: nickNameRef.current.value,
        fullName: fullNameRef.current.value,
      };
      url = "http://localhost:8080/api/signup";
    }
    const config = { data: data, url: url, method: "post", headers: {} };
    const resHandler = (res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("expiresAt", res.data.expiresAt);
      dispatch(authActions.setIsLoggedIn(true));
      navigation("/questions/allquestions", { replace: true });
    };
    await sendRequest(config, resHandler, false);
  };

  const toggleLoginSignup = () => {
    if (match) {
      navigation("/signup", { replace: true });
    } else {
      navigation("/login", { replace: true });
    }
  };

  let extraMessage = "";

  if (error) {
    extraMessage = error.message;
  } else if (isLoading) {
    extraMessage = "Loading...";
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <h1>{loginPage ? "Log In" : "Sign Up"}</h1>
      </div>
      {!loginPage ? (
        <Fragment>
          <div>
            <label htmlFor="nickName">Nick Name</label>
            <input type="text" id="nickName" required ref={nickNameRef} />
          </div>
          <div>
            <label htmlFor="FullName">Full Name</label>
            <input type="text" id="FullName" required ref={fullNameRef} />
          </div>
        </Fragment>
      ) : (
        ""
      )}
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required ref={emailRef} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          minLength={6}
          required
          ref={passwordRef}
        />
      </div>
      <div>
        <Button
          config={{ name: loginPage ? "Log In" : "Sign Up", type: "submit" }}
        />
      </div>
      <div>
        <Button
          config={{
            name: loginPage ? "Create New Account" : "Already a User?",
            click: toggleLoginSignup,
          }}
        />
      </div>
      <h3>{extraMessage}</h3>
    </form>
  );
};

export default AuthForm;
