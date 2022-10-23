import { useState } from "react";
import { Formik } from "formik";

import SelectInput from "../UI/inputs/selectInput";
import Button from "../UI/buttons/button";

import styles from "./notificationForm.module.scss";

const NotificationForm = ({ onCancel, setNoti }) => {
  const [type, setType] = useState();
  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{ content: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.color.length) {
            errors.color = "Colors is required";
          }
          if (!values.size) {
            errors.size = "Size is required";
          }
          if (!values.content) {
            errors.content = "Content is required";
          } else if (values.content < 0) {
            errors.content = "Invalid content";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values);
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
            <div className={`${styles.inputContainer} ${styles.size}`}>
              <label>Type</label>
              <SelectInput
                listData={[
                  {
                    text: "General",
                    value: "general",
                  },
                  {
                    text: "Gift",
                    value: "gift",
                  },
                  {
                    text: "Order",
                    value: "order",
                  },
                ]}
                currentOption={type}
                setCurrentOption={setType}
                theme="light"
              />
              <p className={styles.errors}>
                {errors.size && touched.size && errors.size}
              </p>
            </div>
            <div className={`${styles.inputContainer} ${styles.content}`}>
              <label>Content</label>
              <textarea
                rows={3}
                id="content"
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
            <div className={styles.btnGroup}>
              <Button
                text="Save"
                size="small"
                borderRadius="square"
                disabled={isSubmitting}
              />
              <Button
                text="Cancel"
                size="small"
                borderRadius="square"
                theme="light"
                onClick={onCancel}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default NotificationForm;
