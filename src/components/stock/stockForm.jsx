import { useEffect, useState } from "react";

import styles from "./stockForm.module.scss";

import { SketchPicker } from "react-color";
import { Formik } from "formik";
import Button from "./../UI/buttons/button";
import stockSerice from "../../services/stock";
import { useSelector } from "react-redux";
import SelectInput from "./../UI/inputs/selectInput";

const StockForm = ({ stock, productId, onCancel, setStocks }) => {
  const authen = useSelector((state) => state.authentication);
  const [currentColor, setCurrentColor] = useState("#fff");
  const [currentSize, setCurrentSize] = useState({ text: "M", value: "M" });

  useEffect(() => {
    setCurrentColor(stock?.color || "#fff");
    setCurrentSize(stock?.size || "M");
  }, [stock]);

  const onUpdateStock = async (values) => {
    try {
      const stockToUpdate = {
        ...stock,
        color: currentColor,
        size: currentSize.text,
        quantity: values.quantity,
      };
      const updatedStock = await stockSerice.update(
        stock?.id,
        stockToUpdate,
        authen
      );
      setStocks((prev) =>
        prev.map((item) => (item.id !== stock.id ? item : updatedStock.data))
      );
    } catch (err) {
      console.log(err);
    } finally {
      onCancel();
    }
  };

  const onAddNewStock = async (values) => {
    try {
      const newStock = {
        product: productId,
        color: currentColor,
        size: currentSize.text,
        quantity: values.quantity,
      };
      const returnedStock = await stockSerice.create(
        newStock,
        authen?.user?.token
      );
      setStocks((prev) => prev.concat(returnedStock.data));
    } catch (err) {
      console.log(err);
    } finally {
      onCancel();
    }
  };

  return (
    <div>
      <div className={styles.formContainer}>
        <Formik
          initialValues={
            stock || {
              color: currentColor,
              size: currentSize.text,
              quantity: stock?.quantity || 1,
            }
          }
          validate={(values) => {
            const errors = {};
            if (!values.color.length) {
              errors.color = "Colors is required";
            }
            if (!values.size) {
              errors.size = "Size is required";
            }
            if (!values.quantity) {
              errors.quantity = "Quantity is required";
            } else if (values.quantity < 0) {
              errors.quantity = "Invalid quantity";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              if (stock?.id ? onUpdateStock(values) : onAddNewStock(values))
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
                <label>Size</label>
                <SelectInput
                  listData={[
                    {
                      text: "XS",
                      value: "XS",
                    },
                    {
                      text: "S",
                      value: "S",
                    },
                    {
                      text: "M",
                      value: "M",
                    },
                    {
                      text: "L",
                      value: "L",
                    },
                    {
                      text: "XL",
                      value: "XL",
                    },
                  ]}
                  currentOption={currentSize}
                  setCurrentOption={setCurrentSize}
                />
                <p className={styles.errors}>
                  {errors.size && touched.size && errors.size}
                </p>
              </div>
              <div className={`${styles.inputContainer} ${styles.quantity}`}>
                <label>Quantity</label>
                <input
                  id="quantity"
                  type="text"
                  name="quantity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.quantity}
                  placeholder="Quantity"
                />
                <p className={styles.errors}>
                  {errors.quantity && touched.quantity && errors.quantity}
                </p>
              </div>
              <div className={`${styles.inputContainer} ${styles.colors}`}>
                <label>Color</label>
                <SketchPicker
                  disableAlpha={true}
                  color={currentColor}
                  onChangeComplete={(color, _) => setCurrentColor(color.hex)}
                />
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
    </div>
  );
};

export default StockForm;
