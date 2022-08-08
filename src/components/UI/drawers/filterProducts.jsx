import Drawer from '@mui/material/Drawer';
import { useState } from 'react';

import { filterOptions } from '../../../data';

import styles from "./filterProducts.module.scss"
import { VscChromeClose } from "react-icons/vsc/index"
import DropdownMenu from './dropdownMenu';

const FilterProducts = () => {
    const [open, setOpen] = useState(false)
    const [sort, setSort] = useState(null)

    return <div>
        <button onClick={() => setOpen(true)}>Filters</button>
        <Drawer
            anchor="right"
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className={styles.container}>
                <div className={styles.drawerHeader}>
                    <div className={styles.title}>Filter By</div>
                    <VscChromeClose className={styles.icon} onClick={() => setOpen(false)} />
                </div>
                {filterOptions.map(option => <DropdownMenu key={option.id} item={option} />)}
            </div>
        </Drawer>
    </div>
}

export default FilterProducts