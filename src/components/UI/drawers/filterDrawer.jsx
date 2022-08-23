import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Drawer from '@mui/material/Drawer';
import { VscChromeClose } from "react-icons/vsc/index"

import styles from "./filterDrawer.module.scss"
import DropdownMenu from './dropdownMenu';

import { TbFilter } from "react-icons/tb/index"

import { filtersActions } from '../../../store';

const FilterDrawer = ({ filterOptions }) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const onApplyFilters = () => {
        dispatch(filtersActions.applyFilter())
        setOpen(false)
    }

    return <>
        <button onClick={() => setOpen(true)} className={styles.drawerBtn}><TbFilter className={styles.icon} /> Filters</button>
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
                {filterOptions.map(option =>
                    <DropdownMenu key={option.id} item={option} />
                )}
                <div className={styles.footer} onClick={onApplyFilters}>Apply Filters</div>
            </div>
        </Drawer>
    </>
}

export default FilterDrawer