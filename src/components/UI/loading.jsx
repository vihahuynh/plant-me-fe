import {ImSpinner} from "react-icons/im"

import styles from "./loading.module.scss"

const Loading = () => {
    return <div className={styles.container}>
        <ImSpinner className={styles.icon} />
    </div>
}

export default Loading