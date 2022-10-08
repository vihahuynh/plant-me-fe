import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import notificationService from "../../services/notification";
import NotificationItem from "./notificationItem";

import styles from "./notification.module.scss";
import { useParams } from "react-router-dom";

const Notification = () => {
  const authen = useSelector((state) => state.authentication);
  const [notification, setNotification] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authen?.user) return;
        const notiData = await notificationService.getAll(
          [],
          authen?.user?.token
        );
        setNotification(notiData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authen]);

  if (userId !== authen?.user?.id) return <p>Permission denied</p>;

  return (
    <section>
      <h2>My notification</h2>
      <ul className={styles.notiList}>
        {notification.map((item) => (
          <NotificationItem
            key={item.id}
            item={item}
            userId={authen?.user?.id}
            setNotification={setNotification}
          />
        ))}
      </ul>
    </section>
  );
};

export default Notification;
