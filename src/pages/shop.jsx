import { useState, useEffect } from "react";
import Wrapper from "../components/layout/wrapper";
import Products from "../components/products/products";
import Pagination from "../components/UI/pagination";
import SortDrawer from "../components/UI/drawers/sortDrawer";
import FilterDrawer from "../components/UI/drawers/filterDrawer";

import productService from "../services/product";

import { plantsFilterOptions, plantsSortOptions } from "../data";

import styles from "./shop.module.scss";
import { useHistory, withRouter } from "react-router-dom";
import Loading from "../components/UI/loading";

const Shop = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const queries = history.location.search.slice(1);
  const otherQueries = queries
    .split("&")
    .filter((q) => !q.includes("skip") && !q.includes("limit"))
    .join("&");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await productService.getAll(otherQueries);
        setFilterProducts(productsData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [otherQueries]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (queries.includes("skip") && queries.includes("limit")) {
          const productsData = await productService.getAll(queries);
          setProducts(productsData.data);
        }
      } catch (err) {
        console.log(err);
      }finally {
        setTimeout(() => setIsLoading(false), 100)
      }
    };
    fetchData();
  }, [queries]);

  if (isLoading) {
    return <Wrapper>
      <Loading/>
    </Wrapper>
  }

  return (
    <Wrapper>
      <div className={styles.btnContainers}>
        <div className={styles.btn}>
          <SortDrawer sortOptions={plantsSortOptions} />
        </div>
        <div className={styles.btn}>
          <FilterDrawer filterOptions={plantsFilterOptions} />
        </div>
      </div>
      <div className={styles.container}>
        <Products products={products} />
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={Math.ceil(filterProducts.length / 12)}
          itemsPerPage={12}
        />
      </div>
    </Wrapper>
  );
};

export default withRouter(Shop);
