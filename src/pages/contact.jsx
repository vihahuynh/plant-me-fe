import Wrapper from "../components/layout/wrapper";
import { Formik } from "formik";
import Button from "./../components/UI/buttons/button";

import styles from "./contact.module.scss";
import emailService from "../services/email";
import { alertActions } from "../store";
import { useDispatch } from "react-redux";

let delay

const Contact = () => {
  const dispatch = useDispatch()
  const onSendEmail = async (values) => {
    try {
      clearTimeout(delay)
      await emailService.sendEmail(values)
      dispatch(alertActions.updateMessage({ message: "Sent email successfully!" }))
      delay = setTimeout(() => dispatch(alertActions.clear()), 4000)
    } catch (err) {
      console.log(err)
    }
  }

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
            initialValues={{ email: "", name: "", content: "" }}
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
              if (!values.content) errors.content = "Content is required";
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await onSendEmail(values)
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
                    name="content"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.content}
                    placeholder="Content"
                  />
                  <p className={styles.errors}>
                    {errors.content && touched.content && errors.content}
                  </p>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.btn}
                  text="Submit"
                />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
