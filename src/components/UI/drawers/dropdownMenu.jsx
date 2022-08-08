import { useState } from "react"
import styles from './dropdownMenu.module.scss'

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai/index"

const DropdownMenu = ({ item }) => {
    const [open, setOpen] = useState(false)

    return <div className={styles.container}>
        <div className={styles.header} onClick={() => setOpen(prev => !prev)}>
            <div>{item.text}</div>
            {open ? <AiOutlineMinus className={styles.icon} /> : <AiOutlinePlus className={styles.icon} />}
        </div>
        <div className={styles.menuContainer}>
            <div className={open ? styles.menu : `${styles.menu} ${styles.hidden}`}>
                {item.subOptions.map(option =>
                    <div key={option.id} className={styles.checkbox}>
                        <input type="checkbox" id={option.query} name={option.query} value={option.query} />
                        <label for={option.query}>{option.text}</label>
                    </div>)}
            </div>
        </div>
    </div >
}

export default DropdownMenu