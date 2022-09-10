import { useState } from "react";

import styles from "./inputGroupItem.module.scss";
import { TbTrash, TbEdit } from "react-icons/tb/index";
import { RiSave3Line, RiCloseLine } from "react-icons/ri/index";

const InputGroupItem = ({ item, setItems }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);

  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const onEditItem = () => setIsEditting(true);
  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangeContent = (e) => setContent(e.target.value);

  const handleEditItem = () => {
    const updatedItem = {
      title,
      content,
    };
    setIsEditting(false);
    setItems((prev) => prev.map((i) => (i.id === item.id ? updatedItem : i)));
  };

  const onCancelEdit = () => {
    setIsEditting(false);
    setTitle(item.title);
    setContent(item.content);
  };

  return (
    <li key={item.title} className={styles.item}>
      {isEditting ? (
        <div className={styles.formGroupItem}>
          <div className={styles.inputContainer}>
            <h5>
              Edit item
              <div>
                <RiSave3Line
                  className={`${styles.icon} ${styles.iconBlue}`}
                  onClick={handleEditItem}
                />
                <RiCloseLine
                  className={`${styles.icon} ${styles.iconRed}`}
                  onClick={onCancelEdit}
                />
              </div>
            </h5>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleChangeTitle}
            />
            <textarea
              rows={3}
              name="Content"
              placeholder="Content"
              value={content}
              onChange={handleChangeContent}
            />
          </div>
        </div>
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

export default InputGroupItem;
