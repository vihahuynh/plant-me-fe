import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./account.module.scss";

import Wrapper from "./../../components/layout/wrapper";
import UserLeftMenu from "./../../components/layout/userLetfMenu/userLeftMenu";
import Button from "./../../components/UI/buttons/button";
import RadioInput from "../../components/UI/inputs/radioInput";

import { TbEdit } from "react-icons/tb/index";

import userService from "./../../services/user";
import { authenticationActions } from "./../../store";
import { alertActions } from "../../store";

import Avatar from "react-avatar-edit";
import { Formik } from "formik";
import { useEffect } from "react";

let delay;

const Account = () => {
  const dispatch = useDispatch();
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const authen = useSelector((state) => state.authentication);
  const image = authen?.user?.avatarUrl || "/images/default-avatar.png";
  const [previewImg, setPreviewImg] = useState(null);
  const [gender, setGender] = useState("");

  const onEditAvatar = () => setIsEditAvatar(true);

  const onClose = () => setPreviewImg(null);
  const onCrop = (preview) => setPreviewImg(preview);

  const onBeforeFileLoad = (e) => {
    if (e.target.files[0].size > 5000000) {
      alert("File is too big!");
      e.target.value = "";
    }
  };

  const onSaveAccount = async (values) => {
    try {
      let account = { ...values };
      if (previewImg) {
        account.avatarUrl = previewImg;
      }

      const updatedAccount = await userService.update(
        authen?.user?.id,
        account,
        authen?.user?.token
      );
      clearTimeout(delay);
      dispatch(
        authenticationActions.update({
          user: { ...updatedAccount.data, token: authen?.user?.token },
        })
      );
      dispatch(
        alertActions.updateMessage({
          message: "Update account information successfully!",
          type: "info",
        })
      );
      setIsEditAvatar(false);
      delay = setTimeout(() => {
        dispatch(alertActions.clear());
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setGender(authen?.user?.gender);
  }, [authen?.user?.gender]);

  if (!authen?.user) return <p>Permission denied</p>;

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
                  {isEditAvatar ? (
                    <>
                      <Avatar
                        width={200}
                        height={200}
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
                    </>
                  ) : (
                    <div className={styles.avatar}>
                      <img
                        className={styles.avatarPreview}
                        src={image}
                        alt="Avatar"
                      />
                      <TbEdit
                        className={styles.editAvatarIcon}
                        onClick={onEditAvatar}
                      />
                    </div>
                  )}
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
                <div
                  className={`${styles.inputContainer} ${styles.radioGroup}`}
                >
                  <RadioInput
                    key="female"
                    name="gender"
                    value="female"
                    label="Female"
                    onChange={() => {
                      setGender("female");
                      values.gender = "female";
                    }}
                    checked={gender === "female" ? true : false}
                  />
                  <RadioInput
                    key="male"
                    name="gender"
                    value="male"
                    label="Male"
                    onChange={() => {
                      setGender("male");
                      values.gender = "male";
                    }}
                    checked={gender === "male" ? true : false}
                  />
                </div>
                <div className={styles.buttonGroup}>
                  <Button
                    // className={isSubmitting ? styles.submittingBtn : ""}
                    disabled={isSubmitting}
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
