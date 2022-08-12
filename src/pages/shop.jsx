import { useState } from "react";
import Wrapper from "../components/layout/wrapper";
import Products from "../components/products/products";
import Pagination from "../components/UI/pagination";
import SortDrawer from "../components/UI/drawers/sortDrawer";
import FilterDrawer from "../components/UI/drawers/filterDrawer";

import { products, plantsFilterOptions, plantsSortOptions } from "../data";

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
        <div className={styles.btn}><SortDrawer sortOptions={plantsSortOptions} /></div>
        <div className={styles.btn}><FilterDrawer filterOptions={plantsFilterOptions} /></div>
      </div>
      <div className={styles.container}>
        <Products productsData={products.slice(start, end)} />
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </Wrapper>
  );
};

export default Shop;
