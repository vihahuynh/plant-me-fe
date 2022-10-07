import { useState } from "react";
import CheckBox from "../inputs/checkBox";
import RadioInput from "../inputs/radioInput";
import { filtersActions } from "./../../../store";
import { useDispatch, useSelector } from "react-redux";

import styles from "./dropdownMenu.module.scss";

const DropdownMenu = ({ item }) => {
  const filters = useSelector((state) => state.filters);
  const [open, setOpen] = useState(!!filters.selectedFilters[item.text]);
  const dispatch = useDispatch();

  const onAddFilter = (option, subOption, query) => {
    const filter = filters.selectedFilters[option];
    const newFilters = { ...filters.selectedFilters };
    let newApplyFilters = [...filters.applyFilters];
    if (item.type === "checkbox") {
      if (!filter) {
        newFilters[option] = [subOption];
        newApplyFilters = newApplyFilters.concat(query);
      } else {
        if (filter.includes(subOption)) {
          newFilters[option] = filter.filter((f) => f !== subOption);
          if (newFilters[option].length === 0) {
            delete newFilters[option];
          }
          newApplyFilters = newApplyFilters.filter((f) => f !== query);
        } else {
          newFilters[option] = filter.concat(subOption);
          newApplyFilters = newApplyFilters.concat(query);
        }
      }
    } else if (item.type === "radio") {
      newFilters[option] = subOption;
      newApplyFilters = newApplyFilters.filter(
        (f) => !f.includes(query.split("=")[0])
      );
      newApplyFilters = newApplyFilters.concat(query);
    }
    dispatch(
      filtersActions.updateSelectFilters({
        selectedFilters: newFilters,
        applyFilters: newApplyFilters,
      })
    );
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
              checked={
                filters?.selectedFilters[item.text]?.includes(option.text) ||
                false
              }
              onChange={() => onAddFilter(item.text, option.text, option.query)}
            />
          ))}
        {item.type === "radio" &&
          item.subOptions.map((option) => (
            <RadioInput
              key={option.id}
              name={item.text}
              value={option.query}
              label={option.text}
              onChange={() => onAddFilter(item.text, option.text, option.query)}
            />
          ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
