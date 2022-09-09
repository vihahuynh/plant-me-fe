import { useState } from 'react'
import { Formik } from "formik";
import styles from "./newProductForm.module.scss"
import { PhotoshopPicker } from 'react-color';
import productService from "../../services/product";
import { useEffect } from "react";
import { MdCancel } from "react-icons/md/index"

const NewProductForm = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const [colors, setColors] = useState([])
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedUser'))
        setCurrentUser(user)
    }, [])

    const onAddNewProduct = async (values) => {
        try {
            const formData = new FormData()
            for (const singleFile of values.images) {
                formData.append('images', singleFile)
            }
            formData.append("title", "nemo")
            await productService.create(formData, currentUser?.token)
        } catch (err) {
            console.log(err)
        }
    }

    return <div className={styles.formContainer}>
        <Formik
            initialValues={{ images: [], title: "", about: "", size: [], colors: [], price: "", salePercent: "", livingConditions: [], commonProblems: [], plantCare: [], decorTips: [] }}
            validate={(values) => {
                const errors = {};
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    onAddNewProduct(values)
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
                            type="text"
                            name="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                            placeholder="Title"
                        />
                        <p className={styles.errors}>
                            {errors.title && touched.title && errors.title}
                        </p>
                    </div>
                    <div className={`${styles.inputContainer} ${styles.about}`}>
                        <textarea
                            rows={5}
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
                    <div className={`${styles.inputContainer} ${styles.images}`}>
                        <input
                            multiple
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={(e) => (values.images = e.target.files)}
                            onBlur={handleBlur}
                            value={values.images}
                            placeholder="Image"
                        />
                        <p className={styles.errors}>
                            {errors.files && touched.files && errors.files}
                        </p>
                    </div>
                    <div className={`${styles.inputContainer} ${styles.size}`}>
                        <select
                            name="size"
                            id="size"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                        <p className={styles.errors}>
                            {errors.size && touched.size && errors.size}
                        </p>
                    </div>
                    <div className={`${styles.inputContainer} ${styles.colors}`}>
                        <PhotoshopPicker
                            color={colors[colors.length - 1]}
                            onChangeComplete={(color, _) => {
                                values.colors = [...new Set(values.colors.concat(color.hex))]
                                setColors(prev => [...new Set(prev.concat(color.hex))])
                            }}
                        />
                        <ul className={styles.colorsList}>
                            {colors.map(c =>
                                <li key={c} className={styles.colorItem} style={{ backgroundColor: c }} >
                                    <MdCancel className={styles.deleteColorIcon} onClick={() => {
                                        values.colors = values.colors.filter(color => color !== c)
                                        setColors(values.colors.filter(color => color !== c))
                                    }} />
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className={`${styles.inputContainer} ${styles.price}`}>
                        <input
                            type="text"
                            name="price"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                            placeholder="Price"
                        />
                        <p className={styles.errors}>
                            {errors.price && touched.price && errors.price}
                        </p>
                    </div>
                    <div className={`${styles.inputContainer} ${styles.salePercent}`}>
                        <input
                            type="text"
                            name="salePercent"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.salePercent}
                            placeholder="Sale Percent"
                        />
                        <p className={styles.errors}>
                            {errors.salePercent && touched.salePercent && errors.salePercent}
                        </p>
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
    </div >
}

export default NewProductForm