import { useState } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import userService from "../services/user";

import styles from "./signIn.module.scss";
import { useEffect } from "react";

const ResetPassword = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const result = await userService.getAll();
        setUsers(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  //   const onCreateUser = async (values) => {
  //     try {
  //       const newUser = {
  //         username: values.username,
  //         email: values.email,
  //         password: values.password,
  //       };
  //       const result = await userService.create(newUser);
  //       setUsers((prev) => prev.concat(result?.data));
  //       history.push("/signin");
  //     } catch (err) {
  //       const errorMessage = err?.response?.data?.error;
  //       console.log(errorMessage || "Something when wrong!");
  //     }
  //   };

  return (
    <div className={styles.container}>
      <img src="/images/blog-4.png" alt="plant-care" />
      <div className={styles.formContainer}>
        <h2>Change password for @{}</h2>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.confirmPassword) {
              errors.confirmPassword = "Confirm password is required";
            } else if (values.confirmPassword !== values.password) {
              errors.confirmPassword = "Please enter the same password.";
            }

            if (!values.password) {
              errors.password = "Password is required";
            } else if (values?.password?.length < 8) {
              errors.password = "Password must contain at least 8 characters";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              //   onCreateUser(values);
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
                  type="password"
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
                className={!isSubmitting ? styles.btn : styles.disabledBtn}
              >
                change password
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
