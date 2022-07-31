import styles from "./header.module.scss";
import LinkButton from "./UI/linkbutton";

const Header = () => {
  return (
    <section className={styles.container}>
      <div className={styles.descriptionContainer}>
        <h1>Why wait,</h1>
        <h1>
          <span>Plant</span> a new tree
        </h1>
        <div className={styles.description}>
          <p>The best time to plant a tree was 20 years ago</p>
          <p>The second best time is today</p>
        </div>
        <LinkButton text="Discover" size="medium" link="#" />
      </div>
      <img src="/images/header-img.png" alt="large-snake-plant" />
      <ul className={styles.contact}>
        <li>Instagram</li>
        <li>Facebook</li>
        <li>Twitter</li>
      </ul>
    </section>
  );
};

export default Header;
