import { useState } from "react";
import CheckBox from "../inputs/checkBox";
import RadioInput from "../inputs/radioInput";
import { filtersActions } from "./../../../store";
import { useDispatch, useSelector } from "react-redux";

import styles from "./dropdownMenu.module.scss";

const DropdownMenu = ({ item }) => {
  const filters = useSelector((state) => state.filters);
  const [open, setOpen] = useState(
    filters.filters.some((f) => item.subOptions.map((s) => s.query).includes(f))
  );
  const dispatch = useDispatch();

  const onAddFilter = (query) => {
    let newFilters = [...filters.filters];
    if (item.type === "checkbox") {
      if (newFilters.includes(query)) {
        newFilters = newFilters.filter((f) => f !== query);
      } else {
        newFilters = newFilters.concat(query);
      }
    } else if (item.type === "radio") {
      newFilters = newFilters.filter((f) => !f.includes(query.split("=")[0]));
      newFilters = newFilters.concat(query);
    }
    dispatch(filtersActions.updateFilters({ filters: newFilters }));
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
        {item.type === "checkbox" &&
          item.subOptions.map((option) => (
            <CheckBox
              key={option.id}
              name={option.query}
              value={option.query}
              label={option.text}
              checked={filters.filters.includes(option.query)}
              onChange={() => onAddFilter(option.query)}
            />
          ))}
        {item.type === "radio" &&
          item.subOptions.map((option) => (
            <RadioInput
              key={option.id}
              name={item.text}
              value={option.query}
              label={option.text}
              onChange={() => onAddFilter(option.query)}
              checked={filters.filters.includes(option.query)}
            />
          ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
