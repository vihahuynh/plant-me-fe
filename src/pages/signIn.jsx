import React from "react";
import { Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import loginService from "../services/login";
import { authenticationActions } from "./../store/index";

import styles from "./signIn.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogin = async (values) => {
    try {
      const result = await loginService.login(values);
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({
          isLoggedIn: !!result.data,
          user: result.data,
        })
      );
      console.log(result.data)
      dispatch(authenticationActions.login({ user: result.data }));
      history.push("/");
    } catch (err) {
      const errorMessage = err?.response?.data?.err;
      setError(errorMessage || "Some thing went wrong!");
    }
  };

  return (
    <div className={styles.container}>
      <img src="/images/blog-3.png" alt="plant-care" />
      <div className={styles.formContainer}>
        <h2>Sign In</h2>
        <p className={styles.bigError}>{!!error && error}</p>
        <Formik
          initialValues={{ loginData: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.loginData) {
              errors.loginData = "Username/Email is required";
            }
            if (!values.password) {
              errors.password = "Password is required";
            } else if (values?.password?.length < 8) {
              errors.password = "Password must contain at least 8 characters";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            onLogin(values);
            setTimeout(() => {
              setSubmitting(false);
            }, 500);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  name="loginData"
                  onChange={(e) => {
                    handleChange(e);
                    setError("");
                  }}
                  onBlur={handleBlur}
                  value={values.loginData}
                  placeholder="User/Email"
                />
                <p className={styles.errors}>
                  {errors.loginData && touched.loginData && errors.loginData}
                </p>
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                    setError("");
                  }}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
                />
                <p className={styles.errors}>
                  {errors.password && touched.password && errors.password}
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={!isSubmitting ? styles.btn : styles.disabledBtn}
              >
                Sign in
              </button>
              <Link to="/password-reset" className={styles.link}>Forgot password?</Link>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
