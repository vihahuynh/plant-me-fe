import { useState } from "react";
import { useSelector } from "react-redux";

import { Formik } from "formik";

import productService from "../../services/product";
import InputGroup from "../UI/inputs/inputGroup/inputGroup";
import SelectInput from "../UI/inputs/selectInput";

import styles from "./newProductForm.module.scss";
import "./../../custom.scss";

const NewProductForm = () => {
  const authen = useSelector((state) => state.authentication);
  const [watering, setWatering] = useState("");
  const [light, setLight] = useState("");
  const [idealLocation, setIdealLocation] = useState([]);
  const [whereToGrow, setWhereToGrow] = useState([]);
  const [specialFeatures, setSpecialFeatures] = useState([]);
  // const [livingConditions, setLivingConditions] = useState([]);
  const [commonProblems, setCommonProblems] = useState([]);
  const [decorTips, setDecorTips] = useState([]);
  const [plantCare, setPlantCare] = useState([]);

  const onAddNewProduct = async (values) => {
    try {
      const newProduct = {
        ...values,
        // livingConditions,
        decorTips,
        commonProblems,
        plantCare,
      };
      newProduct.salePercent = values.salePercent
        ? Number(values.salePercent)
        : 0;
      delete newProduct.images;

      const formData = new FormData();
      for (const singleFile of values.images) {
        formData.append("images", singleFile);
      }
      formData.append("obj", JSON.stringify(newProduct));
      const returnedProduct = await productService.create(
        formData,
        authen?.user?.token
      );
      console.log(returnedProduct);
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
          price: "",
          salePercent: "",
          watering,
          light,
          idealLocation,
          specialFeatures,
          commonProblems: [],
          plantCare: [],
          decorTips: [],
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Title is required";
          } else if (values.title.length < 5) {
            errors.title = "Title must contains at least 5 characters";
          }
          if (!values.price) {
            errors.price = "Price is required";
          } else if (isNaN(values.price)) {
            errors.price = "Invalid value";
          }
          if (values && isNaN(values?.salePercent)) {
            errors.salePercent = "Invalid value";
          }
          if (!values.about) {
            errors.about = "About is required";
          }
          if (!values.images.length) {
            errors.images = "Images is required";
          }
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
              <input
                id="tile"
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                placeholder="Title* (Example: Castus)"
              />
              <p className={styles.errors}>
                {errors.title && touched.title && errors.title}
              </p>
            </div>
            <div className={`${styles.inputContainer} ${styles.images}`}>
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
            <div className={`${styles.inputContainer} ${styles.price}`}>
              <input
                id="price"
                type="text"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                placeholder="Price* (Example: 50)"
              />
              <p className={styles.errors}>
                {errors.price && touched.price && errors.price}
              </p>
            </div>
            <div className={`${styles.inputContainer} ${styles.salePercent}`}>
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
              <textarea
                id="about"
                rows={6}
                type="text"
                name="about"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.about}
                placeholder="About*"
              />
              <p className={styles.errors}>
                {errors.about && touched.about && errors.about}
              </p>
            </div>
            <div className={`${styles.inputContainer} ${styles.watering}`}>
              <label className={styles.label}>Watering Schedule</label>
              <SelectInput
                listData={[
                  "Every day",
                  "Every alternate day ",
                  "Once a day",
                  "Once a week",
                  "Twice a week",
                ]}
                currentOption={watering}
                setCurrentOption={setWatering}
              />
            </div>
            <div className={`${styles.inputContainer} ${styles.light}`}>
              <label className={styles.label}>Light</label>
              <SelectInput
                listData={[
                  "Bright ndirect light",
                  "Direct sunlight",
                  "Low light ",
                ]}
                currentOption={light}
                setCurrentOption={setLight}
              />
            </div>
            <div className={`${styles.inputContainer} ${styles.location}`}>
              <label className={styles.label}>Ideal plants location</label>
              <SelectInput
                listData={[
                  "Office desk",
                  "Office premises",
                  "Living room tables",
                  "Shaded Balconies",
                  "Sunny balconies",
                  "Windowsill",
                ]}
                currentOption={idealLocation}
                setCurrentOption={setIdealLocation}
                multiple={true}
              />
            </div>
            <div className={`${styles.inputContainer} ${styles.whereToGrow}`}>
              <label className={styles.label}>Where To Grow</label>
              <SelectInput
                listData={["Indoor", "Outdoor Shade", "Outdoor Sunny"]}
                currentOption={whereToGrow}
                setCurrentOption={setWhereToGrow}
                multiple={true}
              />
            </div>
            <div
              className={`${styles.inputContainer} ${styles.specialFeatures}`}
            >
              <label className={styles.label}>Special Features</label>
              <SelectInput
                listData={["XS", "S", "M", "L", "XL"]}
                currentOption={specialFeatures}
                setCurrentOption={setSpecialFeatures}
                multiple={true}
              />
            </div>
            <div className={styles.plantCare}>
              <InputGroup
                inputTitle="Plant Care"
                items={plantCare}
                setItems={setPlantCare}
              />
            </div>
            <div className={styles.commonProblems}>
              <InputGroup
                inputTitle="Common Problems"
                items={commonProblems}
                setItems={setCommonProblems}
              />
            </div>
            <div className={styles.decorTips}>
              <InputGroup
                inputTitle="Decor Tips"
                items={decorTips}
                setItems={setDecorTips}
              />
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
