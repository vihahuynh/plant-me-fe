import ImageCarousel from "../components/UI/imageCarousel";
import { plantDetails } from "../data";

import Wrapper from "./../components/layout/wrapper"

import styles from "./productDetails.module.scss"

const ProductDetails = ({ id }) => {
  return (
    <Wrapper>
      <div className={styles.container}>
        <ImageCarousel images={plantDetails.images} />
      </div>
    </Wrapper>
  );
};

export default ProductDetails;
