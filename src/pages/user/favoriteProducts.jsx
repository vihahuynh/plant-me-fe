import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import productService from "../../services/product";

import Products from "./../../components/products/products";
import Wrapper from "../../components/layout/wrapper";

const FavoriteProducts = () => {
  const authen = useSelector((state) => state.authentication);
  const [products, setProducts] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = [];

        for (const id of authen?.user?.likedProducts || []) {
          promises.push(productService.get(id));
        }

        const productsData = await Promise.all(promises);
        setProducts(productsData.filter((p) => !!p).map((p) => p.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authen?.user?.likedProducts]);

  if (!authen) return <p>Permission denied</p>;
  if (authen?.user?.id !== userId) return <p>Permission denied</p>;

  return (
    <Wrapper>
      <div>
        <h2>My favorite products</h2>
        <Products products={products} />
      </div>
    </Wrapper>
  );
};

export default FavoriteProducts;
