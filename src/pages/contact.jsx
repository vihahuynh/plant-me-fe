import Wrapper from "../components/layout/wrapper";
import { Formik } from "formik";

import styles from "./contact.module.scss";

const Contact = () => {
  return (
    <Wrapper>
      <div className={styles.contactBox}>
        <ul className={styles.contactInfoList}>
          <li>
            <span>Name: </span>Plantme
          </li>
          <li>
            <span>Address: </span>168B Bai Say Street, Ward 1, District 6, Ho
            Chi Minh city
          </li>
          <li>
            <span>Email: </span>plantme@gmail.com
          </li>
          <li>
            <span>Telephone: </span>(+84) 76 69 01 516
          </li>
        </ul>
        <div className={styles.formContainer}>
          <Formik
            initialValues={{ email: "", name: "", comment: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Email address is required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              if (!values.name) errors.name = "Name is required";
              if (!values.comment) errors.comment = "Comment is required";
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
                    type="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Name"
                  />
                  <p className={styles.errors}>
                    {errors.name && touched.name && errors.name}
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
                  <textarea
                    rows={6}
                    type="text"
                    name="comment"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.comment}
                    placeholder="Comment"
                  />
                  <p className={styles.errors}>
                    {errors.comment && touched.comment && errors.comment}
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.btn}
                >
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
