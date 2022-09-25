import Wrapper from "./../../components/layout/wrapper";
import Notification from "../../components/notification/notification";
import UserLeftMenu from "../../components/layout/userLetfMenu/userLeftMenu";

import styles from "./notificationHistory.module.scss";

const NotificationHistory = () => {
  return (
    <Wrapper>
      <div className={styles.main}>
        <UserLeftMenu />
        <Notification />
      </div>
    </Wrapper>
  );
};
export default NotificationHistory;
