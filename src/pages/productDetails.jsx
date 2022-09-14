import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Wrapper from "./../components/layout/wrapper";
import ImageCarousel from "../components/products/imageCarousel";

import styles from "./productDetails.module.scss";
import BuyInfo from "../components/products/buyInfo";
import Reviews from "../components/reviews/reviews";
import Products from "../components/products/products";
import ProductInfo from "../components/products/productInfo";
import Features from "../components/features/features";
import productService from "../services/product";

const ProductDetails = () => {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const returnProduct = await productService.get(id);
        setProduct(returnProduct?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.images}>
          <ImageCarousel images={product.images} />
        </div>
        <div className={styles.info}>
          <BuyInfo product={product} />
        </div>
        <div className={styles.details}>
          <ProductInfo product={product} />
        </div>
        <div className={styles.similarProducts}>
          <h2>Frequently Bought Together</h2>
          <Products />
        </div>

        <div className={styles.reviews}>
          <Reviews />
        </div>
        <div className={styles.features}>
          <h2>Why People Choose Us?</h2>
          <Features />
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductDetails;
