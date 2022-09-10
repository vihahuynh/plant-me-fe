import { useState } from "react";

import styles from "./groupItem.module.scss";
import { TbTrash, TbEdit } from "react-icons/tb/index";
import InputItem from "./inputItem";

const GroupItem = ({ item, setItems }) => {
  const [isEditting, setIsEditting] = useState(false);

  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const onEditItem = () => setIsEditting(true);

  const handleEditItem = (title, content) => {
    const updatedItem = {
      title,
      content,
    };
    setIsEditting(false);
    setItems((prev) => prev.map((i) => (i.id === item.id ? updatedItem : i)));
  };

  const onCancelEdit = () => {
    setIsEditting(false);
  };

  return (
    <li key={item.title} className={styles.item}>
      {isEditting ? (
        <InputItem
          inputTitle="Edit item"
          item={item}
          onSave={handleEditItem}
          onCancel={onCancelEdit}
        />
      ) : (
        <>
          <div className={styles.itemTitle}>
            <strong>{item.title}: </strong>
            <div>
              <TbEdit
                className={`${styles.icon} ${styles.iconBlue}`}
                onClick={onEditItem}
              />
              <TbTrash
                className={`${styles.icon} ${styles.iconRed}`}
                onClick={() => handleDeleteItem(item.id)}
              />
            </div>
          </div>
          <p>{item.content}</p>
        </>
      )}
    </li>
  );
};

export default GroupItem;
