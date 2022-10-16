import styles from "./addressForm.module.scss";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import { useSelector } from "react-redux";

import Button from "./../UI/buttons/button";
import SelectInput from "../UI/inputs/selectInput";

import addressService from "../../services/address";
import locationService from "../../services/location";

const AddressForm = ({ address, onCancel, setAddresses }) => {
  const authen = useSelector((state) => state.authentication);
  const [provinces, setProvinces] = useState([]);
  const [curProvince, setCurProvince] = useState();
  const [districts, setDistricsts] = useState([]);
  const [curDistrict, setCurDistrict] = useState();
  const [wards, setWards] = useState([]);
  const [curWard, setCurWard] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const provinceData = await locationService.getAll();
      setProvinces(provinceData.data.map((p) => p.name));
    };
    fetchData();
  }, []);

  const onAddNewAddress = async (values) => {
    try {
      const newAddress = await addressService.create(
        values,
        authen?.user?.token
      );
      setAddresses((prev) => prev.concat(newAddress.data));
    } catch (err) {
      console.log(err);
    } finally {
      onCancel();
    }
  };

  const onUpdateAddress = async (id, values) => {
    try {
      const updatedAddress = await addressService.update(
        id,
        values,
        authen?.user?.token
      );
      setAddresses((prev) =>
        prev.map((a) => (a.id !== id ? a : updatedAddress.data))
      );
    } catch (err) {
      console.log(err);
    } finally {
      onCancel();
    }
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{
          name: address?.name || "",
          phoneNumber: address?.phoneNumber || "",
          address: address?.address || "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Full name is required";
          } else if (values.name.length < 5) {
            errors.name = "Full name must contains at least 5 characters";
          }

          if (!values.phoneNumber) {
            errors.phoneNumber = "Phone number is required";
          } else if (
            !/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i.test(
              values.phoneNumber
            )
          ) {
            errors.phoneNumber = "Invalid phone number";
          }

          if (!values.address) {
            errors.address = "Address is required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            if (address) onUpdateAddress(address?.id, values);
            else onAddNewAddress(values);
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
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Full name"
              />
              <p className={styles.errors}>
                {errors.name && touched.name && errors.name}
              </p>
            </div>
            <div className={styles.inputContainer}>
              <input
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                placeholder="Phone number"
              />
              <p className={styles.errors}>
                {errors.phoneNumber &&
                  touched.phoneNumber &&
                  errors.phoneNumber}
              </p>
            </div>
            {/* <div className={styles.inputContainer}>
              <input
                id="address"
                type="text"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                placeholder="Address"
              />
              <p className={styles.errors}>
                {errors.address && touched.address && errors.address}
              </p>
            </div> */}
            <div className={`${styles.inputContainer} ${styles.location}`}>
              <label className={styles.label}>City</label>
              <SelectInput
                listData={provinces}
                currentOption={curProvince}
                setCurrentOption={setCurProvince}
              />
            </div>

            <div className={styles.formBtnGroup}>
              <Button
                className={isSubmitting ? styles.submittingBtn : ""}
                type="submit"
                text="Cancel"
                size="medium"
                borderRadius="square"
                theme="light"
                onClick={onCancel}
              />
              <Button
                className={isSubmitting ? styles.submittingBtn : ""}
                type="submit"
                text={address ? "Update" : "Save"}
                size="medium"
                borderRadius="square"
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddressForm;
