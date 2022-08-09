import React from 'react';
import { Formik } from 'formik';

import styles from "./login.module.scss"

const Login = () => (
    <div className={styles.container}>
        <img src="/images/blog-3.png" />
        <div className={styles.formContainer}>
            <h2>Login</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
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
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="Email address"
                        />
                        {errors.email && touched.email && errors.email}
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder="Password"
                        />
                        {errors.password && touched.password && errors.password}
                        <button type="submit" disabled={isSubmitting} className={styles.btn}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    </div>
);

export default Login;