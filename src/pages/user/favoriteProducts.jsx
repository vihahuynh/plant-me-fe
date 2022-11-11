import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import productService from "../../services/product";

import Products from "./../../components/products/products";
import Wrapper from "../../components/layout/wrapper";
import InfoBox from "../../components/UI/infoBox";
import UserLeftMenu from "../../components/layout/userLetfMenu/userLeftMenu";
import Loading from "../../components/UI/loading";

import styles from "./favoriteProducts.module.scss";

const FavoriteProducts = () => {
  const authen = useSelector((state) => state.authentication);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

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
      }finally {
        setTimeout(() => setIsLoading(false), 0)
      }
    };
    fetchData();
  }, [authen?.user?.likedProducts]);

  if (isLoading) 
    return <Wrapper>
      <Loading/>
    </Wrapper>

  if (!authen?.user?.token)
    return (
      <Wrapper>
        <InfoBox text="Permission denied" btnText="Sign In" url="/signin" />
      </Wrapper>
    );

  return (
    <Wrapper>
      <div className={styles.main}>
        <UserLeftMenu />
        <div>
          <h2>My favorite products</h2>
          {products.length ? (
            <Products products={products} />
          ) : (
            <p className={styles.infoText}>No favorite product found</p>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default FavoriteProducts;
