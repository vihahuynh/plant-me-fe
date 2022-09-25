import Moment from "react-moment";
import LinkButton from "./../UI/buttons/linkbutton";
import Button from "./../UI/buttons/button";

import styles from "./notificationItem.module.scss";

import { BsReceiptCutoff, BsGift } from "react-icons/bs";
import { MdOutlineNotificationsActive } from "react-icons/md";
import notificationService from "../../services/notification";
import { useSelector } from "react-redux";

const getIcon = (type) => {
  switch (type) {
    case "order":
      return (
        <div className={`${styles.iconBox} ${styles.iconGreen}`}>
          <BsReceiptCutoff className={styles.icon} />
        </div>
      );
    case "gift":
      return (
        <div className={`${styles.iconBox} ${styles.iconOrange}`}>
          <BsGift className={styles.icon} />
        </div>
      );
    default:
      return (
        <div className={`${styles.iconBox} ${styles.iconBlue}`}>
          <MdOutlineNotificationsActive className={styles.icon} />
        </div>
      );
  }
};

const NotificationItem = ({ item, setNotification }) => {
  const authen = useSelector((state) => state.authentication);
  const onUpdateNoti = async (type) => {
    const notiToUpdate = {
      ...item,
      isRead: type === "read" ? true : item.isRead,
      show: type === "delete" ? false : item.show,
    };
    const updatedNoti = await notificationService.update(
      item.id,
      notiToUpdate,
      authen?.user?.token
    );
    setNotification((prev) =>
      prev.map((i) => (i.id === item.id ? updatedNoti?.data : i))
    );
  };

  if (!item.show) return null;
  return (
    <li
      className={styles.notiItem}
      style={{ backgroundColor: item.isRead ? "#fff" : "#f2f2f2" }}
    >
      <Moment format="YYYY-MM-DD">{item.createdAt}</Moment>
      {getIcon(item.type)}
      <p className={styles.notiContent}>{item.content}</p>
      <div className={styles.btnGroup}>
        {!item.isRead && (
          <Button
            text="Mark as read"
            borderRadius="square"
            size="small"
            theme="blue"
            onClick={() => onUpdateNoti("read")}
          />
        )}
        <LinkButton
          text="View details"
          borderRadius="square"
          url={
            item.url || `/user/${authen?.user?.id}/order-history/${item.order}`
          }
          size="small"
          type="light"
        />
        <Button
          text="Delete"
          borderRadius="square"
          size="small"
          theme="red"
          onClick={() => onUpdateNoti("delete")}
        />
      </div>
    </li>
  );
};

export default NotificationItem;
