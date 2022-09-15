import styles from "./reviewForm.module.scss";
import { Formik } from "formik";

import reviewService from "../../services/review";
import { useSelector } from "react-redux";

const ReviewForm = ({ productId }) => {
  const authen = useSelector((state) => state.authentication);

  const onAddNewReview = async (values) => {
    try {
      const newReview = {
        ...values,
        productId,
      };
      delete newReview.images;
      console.log("newReview: ", newReview);

      const formData = new FormData();
      for (const singleFile of values.images) {
        formData.append("images", singleFile);
      }
      formData.append("obj", JSON.stringify(newReview));
      const returnReview = await reviewService.create(
        formData,
        authen?.user?.token
      );
      console.log(returnReview);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h5>Enter your review</h5>
      <Formik
        initialValues={{
          title: "",
          content: "",
          rating: 5,
          images: [],
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Title is required";
          } else if (values.title.length < 5) {
            errors.title = "Title must contains at least 5 characters";
          }

          if (!values.content) {
            errors.content = "Content is required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log("values: ", values);
            onAddNewReview(values);
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
                id="tile"
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                placeholder="Review title*"
              />
              <p className={styles.errors}>
                {errors.title && touched.title && errors.title}
              </p>
            </div>
            <div className={styles.inputContainer}>
              <input
                className={styles.fileInput}
                id="images"
                multiple
                type="file"
                accept="image/*"
                name="image"
                onChange={(e) => (values.images = e.target.files)}
                onBlur={handleBlur}
              />
              <p className={styles.errors}>
                {errors.images && touched.images && errors.images}
              </p>
            </div>
            <div className={styles.inputContainer}>
              <textarea
                id="content"
                rows={3}
                type="text"
                name="content"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
                placeholder="Review content*"
              />
              <p className={styles.errors}>
                {errors.content && touched.content && errors.content}
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.btn}
            >
              + Add
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ReviewForm;
