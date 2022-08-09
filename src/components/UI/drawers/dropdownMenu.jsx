import { useState } from "react"

import styles from './dropdownMenu.module.scss'

const DropdownMenu = ({ item }) => {
    const [open, setOpen] = useState(false)


    return <div className={styles.container}>
        <div className={styles.header} onClick={() => setOpen(prev => !prev)}>
            <div>{item.text}</div>
            <span className={open ? styles.minus : ''}></span>
        </div>
        <div className={open ? styles.menuContainer : `${styles.menuContainer} ${styles.hidden}`}>
            {item.subOptions.map(option =>
                <div key={option.id} className={styles.checkbox}>
                    <input className={styles.option} type="checkbox" id={option.query} name={option.query} value={option.query} />
                    <label for={option.query}><span></span>{option.text}</label>
                </div>
            )}
        </div>
    </div >
}

export default DropdownMenu