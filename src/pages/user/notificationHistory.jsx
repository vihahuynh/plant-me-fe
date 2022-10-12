import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Wrapper from "./../../components/layout/wrapper";
import UserLeftMenu from "../../components/layout/userLetfMenu/userLeftMenu";
import notificationService from "../../services/notification";
import NotificationItem from "./../../components/notification/notificationItem";
import FilterDrawer from "../../components/UI/drawers/filterDrawer";
import SortDrawer from "../../components/UI/drawers/sortDrawer";

import { notificationFilterOptions, notificationSortOptions } from "./../../data"
import styles from "./notificationHistory.module.scss";

const NotificationHistory = () => {
  const authen = useSelector((state) => state.authentication);
  const [allNotification, setAllNotification] = useState([])
  const [notification, setNotification] = useState([]);
  const { userId } = useParams();
  const history = useHistory()
  const queries = history.location.search.slice(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authen?.user) return;
        const notiData = await notificationService.getAll(
          [],
          authen?.user?.token
        );
        setAllNotification(notiData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authen?.user) return;
        const notiData = await notificationService.getAll(
          queries,
          authen?.user?.token
        );
        setNotification(notiData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authen, queries]);

  if (userId !== authen?.user?.id) return <p>Permission denied</p>;

  return (
    <Wrapper>
      <div className={styles.main}>
        <UserLeftMenu />
        <div className={styles.container}>
          <h2>My notification</h2>
          {!!allNotification.length && (
            <div className={styles.btnContainers}>
              <div className={styles.btn}>
                <SortDrawer sortOptions={notificationSortOptions} />
              </div>
              <div className={styles.btn}>
                <FilterDrawer filterOptions={notificationFilterOptions} />
              </div>
            </div>
          )}
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
        </div>
      </div>
    </Wrapper>
  );
};

export default NotificationHistory;


