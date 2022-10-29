import styles from "./usefulLinks.module.scss";
import { Link } from "react-router-dom";

const UsefulLinks = ({ title, links }) => {
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>{title}</h5>
      <ul className={styles.linkList}>
        {links.map((l) => (
          <li key={l.id} className={styles.linkItem}>
            <Link to={l.url}>{l.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsefulLinks;
