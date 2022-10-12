import styles from "./selectInput.module.scss";

const SelectInput = ({
  listData,
  currentOption,
  setCurrentOption,
  multiple = false,
}) => {
  const onSelectMultipleData = (value) => {
    if (currentOption.includes(value)) {
      setCurrentOption((prev) => prev.filter((op) => op !== value));
    } else {
      setCurrentOption((prev) => prev.concat(value));
    }
  };

  if (!multiple) {
    return (
      <ul className={styles.dataList}>
        {listData.map((item) => (
          <li
            className={`${styles.dataItem} ${
              currentOption === item ? styles.active : ""
            }`}
            key={item}
            onClick={() => setCurrentOption(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className={styles.dataList}>
      {listData.map((item) => (
        <li
          className={`${styles.dataItem} ${
            currentOption.includes(item) ? styles.active : ""
          }`}
          key={item}
          onClick={() => onSelectMultipleData(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default SelectInput;
