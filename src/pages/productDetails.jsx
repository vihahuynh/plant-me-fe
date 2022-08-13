import { plantDetails } from "../data";

import Wrapper from "./../components/layout/wrapper";
import ImageCarousel from "../components/products/imageCarousel";

import styles from "./productDetails.module.scss";
import BuyInfo from "../components/products/buyInfo";
import Reviews from "../components/reviews/reviews";
import Products from "../components/products/products";
import ProductInfo from "../components/products/productInfo";
import Features from "../components/features/features";

const ProductDetails = ({ id }) => {
  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.images}>
          <ImageCarousel images={plantDetails.images} />
        </div>
        <div className={styles.info}>
          <BuyInfo product={plantDetails} />
        </div>
        <div className={styles.details}>
          <ProductInfo product={plantDetails} />
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
