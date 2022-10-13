import { useState } from "react";
import styles from "./selectInput.module.scss";

const SelectInput = ({
  listData,
  currentOption,
  setCurrentOption,
  multiple = false,
}) => {
  const [openDataList, setOpenDataList] = useState(false)
  const onSelectMultipleData = (value) => {
    if (currentOption.includes(value)) {
      setCurrentOption((prev) => prev.filter((op) => op !== value));
    } else {
      setCurrentOption((prev) => prev.concat(value));
    }
  };

  const toggleOpenDataList = () => setOpenDataList(prev => !prev)

  if (!multiple) {
    return (
      <div className={styles.container}>
        <div className={styles.optionBox} onClick={toggleOpenDataList}>
          <ul className={styles.choosenDataList} data-num-item={listData.length}>
            {currentOption ? <li
              className={styles.choosenDataItem}
              key={currentOption}
              onClick={() => setCurrentOption(currentOption)}
            >
              {currentOption}
            </li>
              : <p className={styles.text}>Please select an option</p>
            }
          </ul>
        </div>
        <ul className={styles.dataList} style={{ maxHeight: openDataList ? `${4 * listData.length}rem` : 0 }} >
          {
            listData.map((item) => (
              <li
                className={`${styles.dataItem} ${currentOption === item ? styles.active : ""
                  }`}
                key={item}
                onClick={() => setCurrentOption(item)}
              >
                {item}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.optionBox} onClick={toggleOpenDataList}>
        <ul className={styles.choosenDataList} data-num-item={listData.length}>
          {currentOption.length ?
            currentOption.map(item => <li
              className={styles.choosenDataItem}
              key={item}
              onClick={() => setCurrentOption(item)}
            >
              {item}
            </li>
            )
            : <p className={styles.text}>Please select an option</p>
          }
        </ul>
      </div>
      <ul className={styles.dataList} style={{ maxHeight: openDataList ? `${4 * listData.length}rem` : 0 }} >
        {listData.map((item) => (
          <li
            className={`${styles.dataItem} ${currentOption.includes(item) ? styles.active : ""
              }`}
            key={item}
            onClick={() => onSelectMultipleData(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
};

export default SelectInput;
