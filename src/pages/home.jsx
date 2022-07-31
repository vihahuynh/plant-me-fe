import Header from "../components/header";
import PopularProducts from "../components/products/popularProducts";
import Features from "../components/features/features";
import Blogs from "../components/blogs/blogs";
import Categories from "../components/categories";

const Home = () => {
  return (
    <>
      <Header />
      <PopularProducts />
      <Categories />
      <Features />
      <Blogs />
    </>
  );
};

export default Home;
