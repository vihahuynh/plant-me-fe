import { useState } from "react";
import CheckBox from "../checkBox";

import styles from "./dropdownMenu.module.scss";

const DropdownMenu = ({ item, setFilters }) => {
  const [open, setOpen] = useState(false);

  const onAddFilter = (option, subOption) => {
    setFilters((prev) => {
      const filter = prev.get(option);
      const newFilters = prev;
      if (!filter) {
        newFilters.set(option, [subOption]);
      } else {
        newFilters.set(option, filter.concat(subOption));
      }
      return newFilters;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={() => setOpen((prev) => !prev)}>
        <div>{item.text}</div>
        <span className={open ? styles.minus : ""}></span>
      </div>
      <div
        className={
          !open
            ? styles.menuContainer
            : `${styles.menuContainer} ${styles.active}`
        }
      >
        {item.subOptions.map((option) => (
          <CheckBox
            key={option.id}
            name={option.query}
            value={option.query}
            label={option.text}
            onChange={() => onAddFilter(item.text, option.text)}
          />
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
