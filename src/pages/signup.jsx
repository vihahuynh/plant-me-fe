import React from "react";
import { Formik } from "formik";

import styles from "./signIn.module.scss";

const SignUp = () => (
  <div className={styles.container}>
    <img src="/images/blog-2.png" alt="plant-care" />
    <div className={styles.formContainer}>
      <h2>Sign Up</h2>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = "Username is required";
          } else if (values.username?.length < 5) {
            errors.username = "Username must contain at least 5 characters";
          }

          if (!values.email) {
            errors.email = "Email address is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm password is required";
          } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "Please enter the same value again.";
          }

          if (!values.password) {
            errors.password = "Password is required";
          } else if (values.password?.length < 8) {
            errors.password = "Password must contain at least 8 characters";
          }

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
                type="username"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                placeholder="Username"
              />
              <p className={styles.errors}>
                {errors.username && touched.username && errors.username}
              </p>
            </div>
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
            <div className={styles.inputContainer}>
              <input
                type="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                placeholder="Confirm password"
              />
              <p className={styles.errors}>
                {errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword}
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.btn}
            >
              create account
            </button>
          </form>
        )}
      </Formik>
    </div>
  </div>
);

export default SignUp;