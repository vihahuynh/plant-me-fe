import { useState } from "react";
import styles from "./selectInput.module.scss";

const SelectInput = ({
  listData,
  currentOption,
  setCurrentOption,
  multiple = false,
}) => {
  const [openDataList, setOpenDataList] = useState(false);

  const onSelectMultipleData = (value) => {
    if (currentOption.includes(value)) {
      setCurrentOption((prev) => prev.filter((op) => op !== value));
    } else {
      setCurrentOption((prev) => prev.concat(value));
    }
    toggleOpenDataList();
  };

  const onSelectData = (value) => {
    setCurrentOption(value);
    toggleOpenDataList();
  };

  const toggleOpenDataList = () => setOpenDataList((prev) => !prev);

  if (!multiple) {
    return (
      <div className={styles.container}>
        <div className={styles.optionBox} onClick={toggleOpenDataList}>
          <p className={styles.chosenText}>
            {currentOption?.text || "Please select an option"}
          </p>
        </div>
        <ul
          className={`${styles.dataList} ${openDataList ? styles.active : ""}`}
        >
          {listData.map((item) => (
            <li
              className={`${styles.dataItem} ${
                currentOption === item ? styles.active : ""
              }`}
              key={item.value}
              onClick={() => onSelectData(item)}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.optionBox} onClick={toggleOpenDataList}>
        <p className={styles.chosenText}>
          {currentOption?.map((op) => op.text)?.join(", ") ||
            "Please select an option"}
        </p>
      </div>
      <ul className={`${styles.dataList} ${openDataList ? styles.active : ""}`}>
        {listData.map((item) => (
          <li
            className={`${styles.dataItem} ${
              currentOption.includes(item) ? styles.active : ""
            }`}
            key={item.value}
            onClick={() => onSelectMultipleData(item)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectInput;
