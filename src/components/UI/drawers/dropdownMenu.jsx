import { useState } from "react";
import CheckBox from "../checkBox";
import RadioInput from "../radioInput";
import { filtersActions } from "./../../../store";
import { useDispatch, useSelector } from "react-redux";

import styles from "./dropdownMenu.module.scss";

const DropdownMenu = ({ item }) => {
  const selectedFilters = useSelector((state) => state.filters.selectedFilters);
  const [open, setOpen] = useState(!!selectedFilters[item.text]);
  const dispatch = useDispatch();

  const onAddFilter = (option, subOption) => {
    const filter = selectedFilters[option];
    const newFilters = { ...selectedFilters };
    if (item.type === "checkbox") {
      if (!filter) {
        newFilters[option] = [subOption];
      } else {
        if (filter.includes(subOption)) {
          newFilters[option] = filter.filter((f) => f !== subOption);
          if (newFilters[option].length === 0) {
            delete newFilters[option]
          }
        } else {
          newFilters[option] = filter.concat(subOption);
        }
      }
    } else if (item.type === "radio") {
      newFilters[option] = subOption
    }
    console.log("newFilters: ", newFilters)
    dispatch(filtersActions.updateSelectFilters({ filters: newFilters }));
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
        {item.type === "checkbox" && item.subOptions.map((option) => (
          <CheckBox
            key={option.id}
            name={option.query}
            value={option.query}
            label={option.text}
            checked={selectedFilters[item.text]?.includes(option.text) || false}
            onChange={() => onAddFilter(item.text, option.text)}
          />
        ))}
        {item.type === "radio" && item.subOptions.map((option) => (
          <RadioInput
            key={option.id}
            name={item.text}
            value={option.query}
            label={option.text}
            // checked={selectedFilters[item.text]?.includes(option.text) || false}
            onChange={() => onAddFilter(item.text, option.text)}
          />
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
