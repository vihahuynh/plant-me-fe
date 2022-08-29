import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Drawer from '@mui/material/Drawer';
import { VscChromeClose } from "react-icons/vsc/index"

import styles from "./filterDrawer.module.scss"
import DropdownMenu from './dropdownMenu';

import { TbFilter } from "react-icons/tb/index"

import { filtersActions } from '../../../store';

const FilterDrawer = ({ filterOptions }) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const filters = useSelector(state => state.filters.selectedFilters)

    const onApplyFilters = () => {
        dispatch(filtersActions.applyFilter())
        setOpen(false)
    }

    const onClearAll = () => {
        dispatch(filtersActions.clear())
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
                <div className={styles.filters}>

                    {Object.keys(filters).length > 0 &&
                        <div className={styles.selectedFilters}>
                            <div className={styles.filtersHeaderBox}>
                                <h5>Selected filters: </h5>
                                <h5 className={styles.clear} onClick={onClearAll}>Clear All</h5>
                            </div>
                            <ul>
                                {Object.keys(filters).map(key => {
                                    if (Array.isArray(filters[key])) {
                                        return <>{filters[key].map(value => <li key={`${key}-${value}`}><span className={styles.key}>{key}: </span><span>{value}</span></li>)}</>
                                    } else {
                                        return <li key={`${key}-${filters[key]}`}><span className={styles.key}>{key}: </span><span>{filters[key]}</span></li>
                                    }
                                })}
                            </ul>
                        </div>
                    }
                    {filterOptions.map(option =>
                        <DropdownMenu key={option.id} item={option} />
                    )}
                </div>
                <div className={styles.footer} onClick={onApplyFilters}>Apply Filters</div>
            </div>
        </Drawer>
    </>
}

export default FilterDrawer