import Header from "../components/layout/header";
import Products from "../components/products/products";
import Features from "../components/features/features";
import Blogs from "../components/blogs/blogs";
import Categories from "../components/categories/categories";
import Wrapper from "../components/layout/wrapper";

import styles from "./home.module.scss"

const Home = () => {
  return (
    <Wrapper>
      <Header />
      <div className={styles.container}>
        <section>
          <h2>Popular Products</h2>
          <Products />
        </section>
        <section>
          <h2>Shop By Categories</h2>
          <Categories />
        </section>
        <section>
          <h2>Why People Choose Us?</h2>
          <Features />
        </section>
        <section>
          <h2>Read Our Blogs</h2>
          <Blogs />
        </section>
      </div>
    </Wrapper>
  );
};

export default Home;
