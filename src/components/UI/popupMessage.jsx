import styles from "./popupMessage.module.scss"

const PopupMessage = ({ message, type = "info" }) => {
    const messageBoxClasses = `${styles.messageBox} ${styles[type]}`

    if (!message) return null

    return <div className={messageBoxClasses}>
        <p>{message}</p>
    </div>
}

export default PopupMessage