import { useState, useEffect } from "react";
import Wrapper from "../components/layout/wrapper";
import Products from "../components/products/products";
import Pagination from "../components/UI/pagination";
import SortDrawer from "../components/UI/drawers/sortDrawer";
import FilterDrawer from "../components/UI/drawers/filterDrawer";

import productService from "../services/product";

import { plantsFilterOptions, plantsSortOptions } from "../data";

import styles from "./shop.module.scss"

const Shop = () => {
  const [products, setProducts] = useState([])
  const itemsPerPage = 4;
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await productService.getAll()
        setProducts(productsData.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const productsToDisplay = products.filter(p => !!p.stocks.length)

  const totalPages = Math.ceil(productsToDisplay.length / itemsPerPage);

  const start = (page - 1) * itemsPerPage;
  const end =
    page * itemsPerPage < productsToDisplay.length
      ? page * itemsPerPage
      : productsToDisplay.length;

  return (
    <Wrapper>
      <div className={styles.btnContainers}>
        <div className={styles.btn}><SortDrawer sortOptions={plantsSortOptions} /></div>
        <div className={styles.btn}><FilterDrawer filterOptions={plantsFilterOptions} /></div>
      </div>
      <div className={styles.container}>
        <Products products={productsToDisplay.slice(start, end)} />
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </Wrapper>
  );
};

export default Shop;
