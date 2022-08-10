import React from "react";
import { Formik } from "formik";

import styles from "./signIn.module.scss";

const SignIn = () => (
  <div className={styles.container}>
    <img src="/images/blog-3.png" alt="plant-care" />
    <div className={styles.formContainer}>
      <h2>Sign In</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email address is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) errors.password = "Password is required";
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email address"
              />
              <p className={styles.errors}>
                {errors.email && touched.email && errors.email}
              </p>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="password"
                name="password"
                onChange={handleChange}
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
              className={styles.btn}
            >
              Sign in
            </button>
            <a className={styles.link} href="/#">
              Forgot password?
            </a>
          </form>
        )}
      </Formik>
    </div>
  </div>
);

export default SignIn;
