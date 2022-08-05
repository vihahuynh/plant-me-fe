import Header from "../components/header";
import Products from "../components/products/products";
import Features from "../components/features/features";
import Blogs from "../components/blogs/blogs";
import Categories from "../components/categories";
import Wrapper from "../components/layout/wrapper";

const Home = () => {
  return (
    <Wrapper>
      <Header />
      <Products />
      <Categories />
      <Features />
      <Blogs />
    </Wrapper>
  );
};

export default Home;
