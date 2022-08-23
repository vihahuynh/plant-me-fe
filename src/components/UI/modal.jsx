import Button from "./../UI/button"

import styles from "./modal.module.scss"

const Modal = ({ isOpen = false, title, message, onConfirm, actionText, onCancel }) => {
    return <div className={isOpen ? styles.layout : styles.hidden}>
        <div className={styles.modal}>
            <h5>{title}</h5>
            <p>{message}</p>
            <div className={styles.buttonGroup}>
                <Button text={actionText} size="medium" borderRadius="square" onClick={onConfirm} />
                <Button text="Cancel" size="medium" borderRadius="square" onClick={onCancel} />
            </div>
        </div>
    </div>
}

export default Modal