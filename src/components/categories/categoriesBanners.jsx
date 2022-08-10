import { categoriesBanners } from "./../../data";
import CategoriesBannerItem from "./categoriesBannerItem";

import styles from "./categoriesBanners.module.scss";

const CategoriesBanners = () => {
  return (
    <div className={styles.categoriesContainer}>
      {categoriesBanners.map((category) => (
        <CategoriesBannerItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoriesBanners;
