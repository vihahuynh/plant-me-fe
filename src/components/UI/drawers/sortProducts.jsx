import Drawer from '@mui/material/Drawer';
import { useState } from 'react';

import { sortOptions } from '../../../data';

import styles from "./sortProducts.module.scss"
import { VscChromeClose } from "react-icons/vsc/index"

const SortProducts = () => {
    const [open, setOpen] = useState(false)
    const [sort, setSort] = useState(null)

    return <div>
        <button onClick={() => setOpen(true)}>Sort</button>
        <Drawer
            anchor="right"
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className={styles.container}>
                <div className={styles.drawerHeader}>
                    <div className={styles.title}>Sort By</div>
                    <VscChromeClose className={styles.icon} onClick={() => setOpen(false)} />
                </div>
                <ul className={styles.list}>
                    {sortOptions.map(option =>
                        <li
                            className={option.query === sort ? styles.curOption : ''}
                            key={option.id}
                            onClick={() => {
                                setSort(option.query)
                                setOpen(false)
                            }}>
                            {option.text}
                        </li>)}
                </ul>
            </div>
        </Drawer>
    </div>
}

export default SortProducts