import styles from "./usefulLinks.module.scss";

const UsefulLinks = ({ title, links }) => {
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>{title}</h5>
      <ul className={styles.linkList}>
        {links.map((l) => (
          <li key={l.id} className={styles.linkItem}>
            <a href={l.url}>{l.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsefulLinks;
