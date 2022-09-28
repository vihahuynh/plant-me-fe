import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Formik } from "formik";
import { SketchPicker } from "react-color";
import { MdCancel } from "react-icons/md/index";

import productService from "../../services/product";
import InputGroup from "../UI/inputs/inputGroup/inputGroup";
import styles from "./productUpdateForm.module.scss";
import "./../../custom.scss";

const UpdateProductForm = () => {
  const { id } = useParams();
  const authen = useSelector((state) => state.authentication);
  const [product, setProduct] = useState();
  const [productImages, setProductImages] = useState([]);
  const [livingConditions, setLivingConditions] = useState([]);
  const [commonProblems, setCommonProblems] = useState([]);
  const [decorTips, setDecorTips] = useState([]);
  const [plantCare, setPlantCare] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await productService.get(id);
        setProduct(productData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    setLivingConditions(product?.livingConditions || []);
    setCommonProblems(product?.commonProblems || []);
    setDecorTips(product?.decorTips || []);
    setPlantCare(product?.plantCare || []);
    setProductImages(product?.images || []);
  }, [product]);

  // const [currentColor, setCurrentColor] = useState("#fff");
  // const [colors, setColors] = useState([]);

  const onUpdateProduct = async (values) => {
    try {
      const productToUpdate = {
        ...values,
        livingConditions,
        decorTips,
        commonProblems,
        plantCare,
      };
      delete productToUpdate.stocks;
      delete productToUpdate.reviews;

      productToUpdate.salePercent = values.salePercent
        ? Number(values.salePercent)
        : 0;
      delete productToUpdate.images;

      const formData = new FormData();
      for (const singleFile of values.images) {
        formData.append("images", singleFile);
      }
      formData.append("obj", JSON.stringify(productToUpdate));
      const returnedProduct = await productService.update(
        product?.id,
        formData,
        authen?.user?.token
      );
      setProduct(returnedProduct.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) return <p>No product found</p>;
  return (
    <div className={styles.formContainer}>
      <h2>Update product ID: #{product.id}</h2>
      <Formik
        initialValues={product}
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
          // if (!values.colors.length) {
          //   errors.colors = "Colors is required";
          // }
          if (!values.images.length) {
            errors.images = "Images is required";
          }
          // if (!values.size) {
          //   errors.size = "Size is required";
          // }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            onUpdateProduct(values);
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
              <div className={styles.imgs}>
                {productImages?.map((img) => (
                  <img key={img} className={styles.img} src={img} alt="" />
                ))}
              </div>
            </div>
            {/* <div className={`${styles.inputContainer} ${styles.size}`}>
              <select
                multiple
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
            </div> */}
            {/* <div className={`${styles.inputContainer} ${styles.colors}`}>
              <SketchPicker
                disableAlpha={true}
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
                  <p className={styles.colorErrors}>
                    {!colors.length &&
                      errors.colors &&
                      touched.colors &&
                      errors.colors}
                  </p>
                  <ul className={styles.colorsList}>
                    {colors.map((c) => (
                      <li
                        key={c}
                        className={styles.colorItem}
                        style={{ backgroundColor: c }}
                        onClick={() => setCurrentColor(c)}
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
            </div> */}
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
            <div className={styles.livingConditions}>
              <InputGroup
                inputTitle="Living Conditions"
                items={livingConditions}
                setItems={setLivingConditions}
              />
              {/* <p className={styles.errors}>{!livingConditions.length && "Living conditions is required"} </p> */}
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
              Update
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProductForm;
