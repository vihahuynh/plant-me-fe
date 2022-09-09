import { useState } from "react";
import styles from "./inputGroup.module.scss";
import { TbTrash, TbEdit } from "react-icons/tb/index";
import { RiSave3Line, RiCloseLine } from "react-icons/ri/index";
import Button from "./../../buttons/button";

const InputGroup = ({ inputTitle }) => {
  const [items, setItems] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddItem = () => {
    setItems((prev) =>
      prev.concat({
        id: Date.now(),
        title,
        content,
      })
    );
    onCancel();
  };

  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangeContent = (e) => setContent(e.target.value);

  const onCancel = () => {
    setOpenForm(false);
    setContent("");
    setTitle("");
  };

  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className={styles.container}>
      <h5>{inputTitle}</h5>
      <ul className={styles.itemList}>
        {items.map((i) => (
          <li key={i.title} className={styles.item}>
            <p>
              <strong>{i.title}: </strong>
              {i.content}
            </p>
            <div>
              <TbEdit className={`${styles.icon} ${styles.iconBlue}`} />
              <TbTrash
                className={`${styles.icon} ${styles.iconRed}`}
                onClick={() => handleDeleteItem(i.id)}
              />
            </div>
          </li>
        ))}
      </ul>
      {openForm ? (
        <div className={styles.formGroup}>
          <div className={styles.inputContainer}>
            <h5>
              Item {items.length + 1}
              <div>
                <RiSave3Line
                  className={`${styles.icon} ${styles.iconBlue}`}
                  onClick={handleAddItem}
                />
                <RiCloseLine
                  className={`${styles.icon} ${styles.iconRed}`}
                  onClick={onCancel}
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
        <Button
          text="+ New item"
          size="small"
          borderRadius="square"
          onClick={() => setOpenForm(true)}
        />
      )}
    </div>
  );
};

export default InputGroup;
