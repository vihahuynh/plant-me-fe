import { useState } from "react";
import Wrapper from "../components/layout/wrapper";
import FilterProducts from "../components/UI/drawers/filterProducts";
import SortProducts from "../components/UI/drawers/sortProducts";
import Products from "../components/products/products";
import Pagination from "../components/UI/pagination";

import { products } from "../data";

import styles from "./shop.module.scss"

const Shop = () => {
  const itemsPerPage = 2;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const start = (page - 1) * itemsPerPage;
  const end =
    page + itemsPerPage < products.length
      ? page + itemsPerPage - 1
      : products.length;

  return (
    <Wrapper>
      <div className={styles.btnContainers}>
        <div className={styles.btn}><SortProducts /></div>
        <div className={styles.btn}><FilterProducts /></div>
      </div>
      <div className={styles.container}>
        <Products productsData={products.slice(start, end)} />
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </Wrapper>
  );
};

export default Shop;
