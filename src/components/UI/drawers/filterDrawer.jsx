import { useState } from "react";

import Drawer from "@mui/material/Drawer";
import { VscChromeClose } from "react-icons/vsc/index";

import styles from "./filterDrawer.module.scss";
import DropdownMenu from "./dropdownMenu";

import { TbFilter } from "react-icons/tb/index";
import { useHistory } from "react-router-dom";

const FilterDrawer = ({ filterOptions }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const queries = history.location.search.slice(1);

  const onClearAll = () => {
    history.push({ search: "" });
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className={styles.drawerBtn}>
        <TbFilter className={styles.icon} /> Filters
      </button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className={styles.container}>
          <div className={styles.drawerHeader}>
            <div className={styles.title}>Filter By</div>

            <VscChromeClose
              className={styles.icon}
              onClick={() => setOpen(false)}
            />
          </div>
          <div className={styles.filters}>
            {!!queries.length && (
              <h5 className={styles.clear} onClick={onClearAll}>
                Clear All
              </h5>
            )}
            {filterOptions.map((option) => (
              <DropdownMenu key={option.id} item={option} />
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
