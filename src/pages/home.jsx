import Header from "../components/header";
import PopularProducts from "../components/products/popularProducts";
import Features from "../components/features/features";
import Blogs from "../components/blogs/blogs";
import Categories from "../components/categories";
import Wrapper from "../components/layout/wrapper";

const Home = () => {
  return (
    <Wrapper>
      <Header />
      <PopularProducts />
      <Categories />
      <Features />
      <Blogs />
    </Wrapper>
  );
};

export default Home;
