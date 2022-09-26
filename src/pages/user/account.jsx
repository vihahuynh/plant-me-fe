import { useState } from "react"
import { useSelector } from "react-redux"

import styles from "./account.module.scss"
import Wrapper from "./../../components/layout/wrapper"
import UserLeftMenu from "./../../components/layout/userLetfMenu/userLeftMenu"
import Button from "./../../components/UI/buttons/button"

import { Formik } from "formik"

const Account = () => {
    const authen = useSelector(state => state.authentication)
    const [image, setImage] = useState('http://localhost:3001/photos/1663041926136-fernbutton_45_1.png')

    return <Wrapper>
        <div className={styles.main}>
            <UserLeftMenu />
            <div className={styles.formContainer}>
                <h2>My account</h2>
                <Formik
                    initialValues={{
                        fullName: authen?.user?.fullName || "",
                        email: authen?.user?.email || "",
                        phoneNumber: authen?.user?.phoneNumber || "",
                        avatarUrl: authen?.user?.avatarUrl || "./images/default-user.png",
                        gender: authen?.user?.gender || ""
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (values.fullName && values.fullName.length < 5) {
                            errors.fullName = "Full name must contains at least 5 characters";
                        }
                        if (values.email &&
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = "Invalid email address";
                        }
                        if (values.phoneNumber &&
                            !/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i.test(values.phoneNumber)) {
                            errors.phoneNumber = "Invalid phone number"
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            console.log(values)
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
                                    id="fullName"
                                    type="text"
                                    name="title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fullName}
                                    placeholder="Full Name"
                                />
                                <p className={styles.errors}>
                                    {errors.fullName && touched.fullName && errors.fullName}
                                </p>
                            </div>
                            <div className={styles.inputContainer}>
                                <input
                                    className={styles.fileInput}
                                    id="avatarUrl"
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={(e) => (values.avatarUrl = e.target.files)}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <input
                                    id="email"
                                    type="text"
                                    name="title"
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
                                    name="title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phoneNumber}
                                    placeholder="Phone number"
                                />
                                <p className={styles.errors}>
                                    {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
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
}

export default Account