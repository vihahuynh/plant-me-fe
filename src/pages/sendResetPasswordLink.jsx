import React from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import loginService from "../services/login";
import { authenticationActions } from "./../store/index";

import styles from "./signIn.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import LinkButton from "../components/UI/buttons/linkbutton";

const SendResetPasswordLink = () => {
  const [error, setError] = useState("");
  const [sentEmail, setSentEmail] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  //   const onLogin = async (values) => {
  //     try {
  //       const result = await loginService.login(values);
  //       localStorage.setItem(
  //         "loggedUser",
  //         JSON.stringify({
  //           isLoggedIn: !!result.data,
  //           user: result.data,
  //         })
  //       );
  //       dispatch(authenticationActions.login({ user: result.data }));
  //       history.push("/");
  //     } catch (err) {
  //       const errorMessage = err?.response?.data?.error;
  //       setError(errorMessage || "");
  //     }
  //   };

  return (
    <div className={styles.container}>
      <img src="/images/blog-1.png" alt="plant-care" />
      {!sentEmail ? (
        <div className={styles.formContainer}>
          <h2>Reset Password</h2>
          <p className={styles.bigError}>{!!error && error}</p>
          <Formik
            initialValues={{ email: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Email is required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                //   onLogin(values);
                console.log(values);
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
                  <label className={styles.label}>
                    Enter your user account's verified email address and we will
                    send you a password reset link
                  </label>
                  <input
                    type="text"
                    name="email"
                    onChange={(e) => {
                      handleChange(e);
                      setError("");
                    }}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Email"
                  />
                  <p className={styles.errors}>
                    {errors.email && touched.email && errors.email}
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={!isSubmitting ? styles.btn : styles.disabledBtn}
                >
                  Send password reset email
                </button>
              </form>
            )}
          </Formik>
        </div>
      ) : (
        <div className={styles.infoBox}>
          <h2>Reset Password</h2>
          <p>
            Check your email for a link to reset your password. If it doesn's
            appear within a few minutes, check your spam folder.
          </p>
          <LinkButton
            text="return to sign in"
            url="/signin"
            className={styles.btn}
          />
        </div>
      )}
    </div>
  );
};

export default SendResetPasswordLink;
