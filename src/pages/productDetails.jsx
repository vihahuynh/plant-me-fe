import { plantDetails } from "../data";

import Wrapper from "./../components/layout/wrapper"
import ImageCarousel from "../components/products/imageCarousel";

import styles from "./productDetails.module.scss"
import ProductInfo from "../components/products/productInfo";
import Reviews from "../components/reviews/reviews";

const ProductDetails = ({ id }) => {
  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.images}><ImageCarousel images={plantDetails.images} /></div>
        <div className={styles.info}><ProductInfo product={plantDetails} /></div>
        <div className={styles.reviews}><Reviews /></div>
      </div>
    </Wrapper>
  );
};

export default ProductDetails;
