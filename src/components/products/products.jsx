import styles from "./products.module.scss";
import { products } from "../../data";

import ProductItem from "./productItem";

const Products = ({
  productsData = products,
}) => {
  return (
    <div className={styles.productsContainer}>
      {productsData.map((p) => (
        <ProductItem key={p.id} product={p} />
      ))}
    </div>
  );
};

export default Products;
