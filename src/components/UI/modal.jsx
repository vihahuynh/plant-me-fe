import Button from "./../UI/buttons/button";

import styles from "./modal.module.scss";

const Modal = ({
  isOpen = false,
  title,
  message,
  onConfirm,
  actionText,
  onCancel,
  children,
  size = "small",
  showButtonGroup = true,
}) => {
  const modalClassNames = `${styles.modal} ${styles[size]}`;
  return (
    <div className={isOpen ? styles.layout : styles.hidden}>
      <div className={modalClassNames}>
        {children ? (
          <>{children}</>
        ) : (
          <div>
            <h5>{title}</h5>
            <p>{message}</p>
          </div>
        )}
        {showButtonGroup && (
          <div className={styles.buttonGroup}>
            <Button
              text={actionText}
              size="medium"
              borderRadius="square"
              onClick={onConfirm}
            />
            <Button
              text="Cancel"
              size="medium"
              borderRadius="square"
              onClick={onCancel}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
