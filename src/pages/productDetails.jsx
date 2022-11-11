import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Wrapper from "./../components/layout/wrapper";
import ImageCarousel from "../components/products/imageCarousel";

import styles from "./productDetails.module.scss";
import BuyInfo from "../components/products/buyInfo";
import Reviews from "../components/reviews/reviews";
import ProductInfo from "../components/products/productInfo";
import Features from "../components/features/features";
import Loading from "../components/UI/loading";
import InfoBox from "../components/UI/infoBox";

import productService from "../services/product";

const ProductDetails = () => {
  const params = useParams();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const returnProduct = await productService.get(id);
        setProduct(returnProduct?.data);
      } catch (err) {
        console.log(err);
      }finally{
        setTimeout(() => {setIsLoading(false)}, 300)
      }
    };
    fetchProduct();
  }, [id]);

 if (isLoading) 
  return <Wrapper>
    <Loading/>
  </Wrapper>

  if (!product) {
    return <Wrapper>
      <InfoBox text="No item found" btnText="Back to shopping" url="/shop"/>
    </Wrapper>
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
        <div className={styles.reviews}>
          <Reviews productId={product.id} />
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
