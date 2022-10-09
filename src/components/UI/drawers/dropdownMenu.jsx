import { useState } from "react";
import CheckBox from "../inputs/checkBox";
import RadioInput from "../inputs/radioInput";

import styles from "./dropdownMenu.module.scss";
import { useHistory } from "react-router-dom";

const DropdownMenu = ({ item }) => {
  const history = useHistory();
  const queries = history.location.search.slice(1).split("&");
  const [open, setOpen] = useState(
    queries.some((f) => item.subOptions.map((s) => s.query).includes(f))
  );

  const onAddFilter = (query) => {
    let newQueries = [...queries];
    if (item.type === "checkbox") {
      if (newQueries.includes(query)) {
        newQueries = newQueries.filter((f) => f !== query);
      } else {
        newQueries = newQueries.concat(query);
      }
    } else if (item.type === "radio") {
      newQueries = newQueries.filter((f) => !f.includes(query.split("=")[0]));
      newQueries = newQueries.concat(query);
    }
    history.push({
      search: `?${newQueries.join("&")}`,
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
        {item.type === "checkbox" &&
          item.subOptions.map((option) => (
            <CheckBox
              key={option.id}
              name={option.query}
              value={option.query}
              label={option.text}
              checked={queries.includes(option.query)}
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
              checked={queries.includes(option.query)}
            />
          ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
