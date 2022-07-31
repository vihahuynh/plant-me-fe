import Header from "../components/header";
import PopularProducts from "../components/products/popularProducts";
import Features from "../components/features/features";
import Blogs from "../components/blogs/blogs";

const Home = () => {
  return (
    <>
      <Header />
      <PopularProducts />
      <Features />
      <Blogs />
    </>
  );
};

export default Home;
