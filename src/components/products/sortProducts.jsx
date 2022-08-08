import Drawer from '@mui/material/Drawer';
import { useState } from 'react';

import styles from "./sortProducts.module.scss"
import { VscChromeClose } from "react-icons/vsc/index"

const SortProducts = () => {
    const [open, setOpen] = useState(false)
    const [sort, setSort] = useState(null)

    const sortOptions = [{
        id: 1,
        query: '?sort=name:des',
        text: 'Name: A to Z'
    },
    {
        id: 2,
        query: '?sort=name:desc',
        text: 'Name: Z to A'
    },
    {
        id: 3,
        query: '?sort=price:asc',
        text: 'Price: Low to High'
    },
    {
        id: 4,
        query: '?sort=price:desc',
        text: 'Price: High to Low'
    },
    {
        id: 5,
        query: '?sort=createdAt:desc',
        text: 'New arrivals'
    },
    {
        id: 6,
        query: '?sort=rating:desc',
        text: 'Highest rating'
    },
    {
        id: 7,
        query: '?sort=sold:desc',
        text: 'Best sellers'
    },
    ]
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