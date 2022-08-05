import styles from "./products.module.scss";
import { products } from "../../data";

import ProductItem from "./productItem";

const Products = ({
  title = "Our Popular Products",
  productsData = products,
}) => {
  return (
    <section className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.productsContainer}>
        {productsData.map((p) => (
          <ProductItem key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default Products;
