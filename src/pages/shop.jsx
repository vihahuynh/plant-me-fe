import { useState } from "react";
import Wrapper from "../components/layout/wrapper";
import Products from "../components/products/products";
import Pagination from "../components/UI/pagination";

import { products } from "../data";

const Shop = () => {
  const itemsPerPage = 12;
  const [page, setPage] = useState(1);
  const totalPages = Math.floor(products.length / itemsPerPage) + 1;

  const start = (page - 1) * itemsPerPage;
  const end =
    page + itemsPerPage < products.length
      ? page + itemsPerPage
      : products.length;

  return (
    <Wrapper>
      <Products productsData={products.slice(start, end)} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </Wrapper>
  );
};

export default Shop;
