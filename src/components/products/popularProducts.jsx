import styles from "./popularProducts.module.scss";
import { products } from "../../data";

import ProductItem from "./productItem";

const PopularProducts = () => {
  return (
    <section className={styles.container}>
      <h2>Our Popular Products</h2>
      <div className={styles.productsContainer}>
        {products.map((p) => (
          <ProductItem key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
