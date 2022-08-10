import { plantDetails } from "../data";

import Wrapper from "./../components/layout/wrapper"
import ImageCarousel from "../components/products/imageCarousel";

import styles from "./productDetails.module.scss"
import ProductInfo from "../components/products/productInfo";

const ProductDetails = ({ id }) => {
  return (
    <Wrapper>
      <div className={styles.container}>
        <ImageCarousel images={plantDetails.images} />
        <div><ProductInfo product={plantDetails} /></div>
      </div>
    </Wrapper>
  );
};

export default ProductDetails;
