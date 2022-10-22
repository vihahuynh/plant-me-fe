import styles from "./price.module.scss";

const Price = ({ price, salePercent, size = "medium" }) => {
  const netPrice = Math.round(price - (price * salePercent) / 100);

  let className;
  if (size === "medium") className = styles.priceMediumContainer;
  else if (size === "small") className = styles.priceSmallContainer;
  else className = styles.priceLargeContainer;

  return (
    <div className={className}>
      {!!salePercent ? (
        <>
          <span className={styles.price}>{price}.000 &#x20ab;</span>
          <span className={styles.priceNet}>{netPrice}.000 &#x20ab;</span>
          <span className={styles.salePercent}>(&minus;{salePercent}%)</span>
        </>
      ) : (
        <span className={styles.priceNet}>{price}.000 &#x20ab;</span>
      )}
    </div>
  );
};

export default Price;
