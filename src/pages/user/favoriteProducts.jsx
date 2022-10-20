import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import productService from "../../services/product";

import Products from "./../../components/products/products";
import Wrapper from "../../components/layout/wrapper";

import styles from "./favoriteProducts.module.scss";
import UserLeftMenu from "../../components/layout/userLetfMenu/userLeftMenu";

const FavoriteProducts = () => {
  const authen = useSelector((state) => state.authentication);
  const [products, setProducts] = useState([]);

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
  if (!authen?.user?.id) return <p>Permission denied</p>;

  return (
    <Wrapper>
      <div className={styles.main}>
        <UserLeftMenu />
        <div>
          <h2>My favorite products</h2>
          <Products products={products} />
        </div>
      </div>
    </Wrapper>
  );
};

export default FavoriteProducts;
