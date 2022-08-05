import { categoriesBanners } from "./../../data";
import CategoriesBannerItem from "./categoriesBannerItem";

import styles from "./categoriesBanners.module.scss";

const CategoriesBanners = () => {
  return (
    <div className={styles.container}>
      <h2>Shop by categories</h2>
      <div className={styles.categoriesContainer}>
        {categoriesBanners.map((category) => (
          <CategoriesBannerItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesBanners;
