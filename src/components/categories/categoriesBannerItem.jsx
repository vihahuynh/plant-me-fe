import { Link } from "react-router-dom";

import styles from "./categoriesBannerItem.module.scss";
import { BsArrowRight } from "react-icons/bs/index";

const CategoriesBannerItem = ({ category }) => {
  return (
    <div className={styles.container}>
      <Link to={`/${category.url}`}>
        <img
          className={styles.image}
          src={category.imageUrl}
          alt={category.text}
        />
      </Link>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{category.text}</h3>
        <BsArrowRight className={styles.icon} />
      </div>
    </div>
  );
};

export default CategoriesBannerItem;
