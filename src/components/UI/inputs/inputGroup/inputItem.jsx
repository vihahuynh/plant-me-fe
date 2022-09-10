import { useState } from "react";
import styles from "./inputItem.module.scss";
import { RiSave3Line, RiCloseLine } from "react-icons/ri/index";

const InputItem = ({ item, inputTitle, onSave, onCancel }) => {
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);

  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangeContent = (e) => setContent(e.target.value);

  const onCancelEdit = () => {
    onCancel();
    setTitle(item.title);
    setContent(item.content);
  };

  return (
    <div className={styles.formItem}>
      <div className={styles.inputContainer}>
        <h5>
          {inputTitle}
          <div>
            <RiSave3Line
              className={`${styles.icon} ${styles.iconBlue}`}
              onClick={() => onSave(title, content)}
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
  );
};

export default InputItem;
