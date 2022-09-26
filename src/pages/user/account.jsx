import { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./account.module.scss";
import Wrapper from "./../../components/layout/wrapper";
import UserLeftMenu from "./../../components/layout/userLetfMenu/userLeftMenu";
import Button from "./../../components/UI/buttons/button";

import userService from "./../../services/user";

import Avatar from "react-avatar-edit";
import { Formik } from "formik";

const Account = () => {
  const authen = useSelector((state) => state.authentication);
  const [image, setImage] = useState(
    "http://localhost:3001/photos/1663041926136-fernbutton_45_1.png"
  );
  const [previewImg, setPreviewImg] = useState(null);

  const onClose = () => setPreviewImg(null);
  const onCrop = (preview) => setPreviewImg(preview);

  const onBeforeFileLoad = (e) => {
    if (e.target.files[0].size > 71680) {
      alert("File is too big!");
      e.target.value = "";
    }
  };

  const onSaveAccount = async (values) => {
    try {
      const account = {
        ...values,
        avatarUrl: previewImg,
      };

      const updatedAccount = await userService.update(
        authen?.user?.id,
        account,
        authen?.user?.token
      );
      console.log(updatedAccount.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <div className={styles.main}>
        <UserLeftMenu />
        <div className={styles.formContainer}>
          <h2>My account</h2>
          <Formik
            initialValues={{
              fullName: authen?.user?.fullName || "",
              email: authen?.user?.email || "",
              phoneNumber: authen?.user?.phoneNumber || "",
              gender: authen?.user?.gender || "",
            }}
            validate={(values) => {
              const errors = {};
              if (values.fullName && values.fullName.length < 5) {
                errors.fullName =
                  "Full name must contains at least 5 characters";
              }
              if (
                values.email &&
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (
                values.phoneNumber &&
                !/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i.test(
                  values.phoneNumber
                )
              ) {
                errors.phoneNumber = "Invalid phone number";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                onSaveAccount(values);
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
                <div className={styles.avatarBox}>
                  <Avatar
                    width={390}
                    height={295}
                    onCrop={onCrop}
                    onClose={onClose}
                    onBeforeFileLoad={onBeforeFileLoad}
                    src={image}
                    className={styles.avatarEdit}
                  />
                  <img
                    className={styles.avatarPreview}
                    src={previewImg}
                    alt="Preview"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    placeholder="Full name"
                  />
                  <p className={styles.errors}>
                    {errors.fullName && touched.fullName && errors.fullName}
                  </p>
                </div>
                {/* <div className={styles.inputContainer}>
                  <input
                    className={styles.fileInput}
                    id="avatarUrl"
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={(e) => (values.avatarUrl = e.target.files)}
                    onBlur={handleBlur}
                  />
                </div> */}
                <div className={styles.inputContainer}>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Email Address"
                  />
                  <p className={styles.errors}>
                    {errors.email && touched.email && errors.email}
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
                <div className={styles.buttonGroup}>
                  <Button
                    type="submit"
                    text="Update"
                    size="medium"
                    borderRadius="square"
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default Account;
