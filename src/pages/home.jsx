import { useEffect, useState } from "react";

import Header from "../components/layout/header";
import Features from "../components/features/features";
import Categories from "../components/categories/categories";
import Wrapper from "../components/layout/wrapper";
import Products from "../components/products/products";

import styles from "./home.module.scss";
import productService from "../services/product";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await productService.getAll(
        `specialFeatures=Popular`
      );
      setProducts(productsData.data.slice(0, 4));
    };
    fetchData();
  }, []);

  return (
    <Wrapper>
      <Header />
      <div className={styles.container}>
        <section>
          <h2>Popular Products</h2>
          <Products products={products} />
        </section>
        <section>
          <h2>Shop By Categories</h2>
          <Categories />
        </section>
        <section>
          <h2>Why People Choose Us?</h2>
          <Features />
        </section>
      </div>
    </Wrapper>
  );
};

export default Home;
