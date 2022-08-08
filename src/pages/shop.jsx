import { useState } from "react";
import Wrapper from "../components/layout/wrapper";
import Products from "../components/products/products";
import SortProducts from "../components/products/sortProducts";
import Pagination from "../components/UI/pagination";

import { products } from "../data";

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
      <SortProducts />
      <Products productsData={products.slice(start, end)} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </Wrapper>
  );
};

export default Shop;
