import styles from "./products.module.scss";

import ProductItem from "./productItem";

const Products = ({ products }) => {
  console.log("products: ", products)
  return (
    <div className={styles.productsContainer}>
      {products.map((p) => (
        <ProductItem key={p.id} product={p} />
      ))}
    </div>
  );
};

export default Products;
