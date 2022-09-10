import { useState } from "react";
import { Formik } from "formik";
import styles from "./newProductForm.module.scss";
import { SketchPicker } from "react-color";
import productService from "../../services/product";
import { useEffect } from "react";
import { MdCancel } from "react-icons/md/index";
import InputGroup from "../UI/inputs/inputGroup/inputGroup";

const NewProductForm = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentColor, setCurrentColor] = useState("#fff");
  const [colors, setColors] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    setCurrentUser(user);
  }, []);

  const onAddNewProduct = async (values) => {
    try {
      const formData = new FormData();
      for (const singleFile of values.images) {
        formData.append("images", singleFile);
      }
      formData.append("title", "nemo");
      await productService.create(formData, currentUser?.token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>New product</h2>
      <Formik
        initialValues={{
          images: [],
          title: "",
          about: "",
          size: [],
          colors: [],
          price: "",
          salePercent: "",
          livingConditions: [],
          commonProblems: [],
          plantCare: [],
          decorTips: [],
        }}
        validate={(values) => {
          const errors = {};
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            onAddNewProduct(values);
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
            <div className={`${styles.inputContainer} ${styles.title}`}>
              {/* <label htmlFor="title">Title</label> */}
              <input
                id="tile"
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                placeholder="Title (Example: Castus)"
              />
              <p className={styles.errors}>
                {errors.title && touched.title && errors.title}
              </p>
            </div>
            <div className={`${styles.inputContainer} ${styles.images}`}>
              {/* <label htmlFor="images">Images</label> */}
              <input
                id="images"
                multiple
                type="file"
                accept="image/*"
                name="image"
                onChange={(e) => (values.images = e.target.files)}
                onBlur={handleBlur}
                // value={values.images}
                // placeholder="Image"
              />
              <p className={styles.errors}>
                {errors.files && touched.files && errors.files}
              </p>
            </div>
            <div className={`${styles.inputContainer} ${styles.size}`}>
              {/* <label htmlFor="size">Size</label> */}
              <select
                name="size"
                id="size"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="XS">Size: XS</option>
                <option value="S">Size: S</option>
                <option value="M">Size: M</option>
                <option value="L">Size: L</option>
                <option value="XL">Size: XL</option>
              </select>
              <p className={styles.errors}>
                {errors.size && touched.size && errors.size}
              </p>
            </div>
            <div className={`${styles.inputContainer} ${styles.colors}`}>
              <SketchPicker
                color={currentColor}
                onChangeComplete={(color, _) => setCurrentColor(color.hex)}
              />
              <div className={styles.colorsContainer}>
                <div
                  className={styles.btn}
                  onClick={() => {
                    values.colors = [
                      ...new Set(values.colors.concat(currentColor)),
                    ];
                    setColors((prev) => [
                      ...new Set(prev.concat(currentColor)),
                    ]);
                  }}
                >
                  Add color
                </div>
                <div>
                  <h5>Chosen colors: </h5>
                  <ul className={styles.colorsList}>
                    {colors.map((c) => (
                      <li
                        key={c}
                        className={styles.colorItem}
                        style={{ backgroundColor: c }}
                      >
                        <MdCancel
                          className={styles.deleteColorIcon}
                          onClick={() => {
                            values.colors = values.colors.filter(
                              (color) => color !== c
                            );
                            setColors(
                              values.colors.filter((color) => color !== c)
                            );
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className={`${styles.inputContainer} ${styles.price}`}>
              {/* <label htmlFor="price">Price</label> */}
              <input
                id="price"
                type="text"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                placeholder="Price (Example: 50)"
              />
              <p className={styles.errors}>
                {errors.price && touched.price && errors.price}
              </p>
            </div>
            <div className={`${styles.inputContainer} ${styles.salePercent}`}>
              {/* <label htmlFor="sale-percent">Sale Percent</label> */}
              <input
                id="sale-percent"
                type="text"
                name="salePercent"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.salePercent}
                placeholder="Sale percent (Example: 15)"
              />
              <p className={styles.errors}>
                {errors.salePercent &&
                  touched.salePercent &&
                  errors.salePercent}
              </p>
            </div>
            <div className={`${styles.inputContainer} ${styles.about}`}>
              {/* <label htmlFor="about">About</label> */}
              <textarea
                id="about"
                rows={6}
                type="text"
                name="about"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.about}
                placeholder="About"
              />
              <p className={styles.errors}>
                {errors.about && touched.about && errors.about}
              </p>
            </div>
            <div className={styles.livingConditions}>
              <InputGroup inputTitle="Living Conditions" />
            </div>
            <div className={styles.plantCare}>
              <InputGroup inputTitle="Plant Care" />
            </div>
            <div className={styles.commonProblems}>
              <InputGroup inputTitle="Common Problems" />
            </div>
            <div className={styles.decorTips}>
              <InputGroup inputTitle="Decor Tips" />
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
  );
};

export default NewProductForm;
