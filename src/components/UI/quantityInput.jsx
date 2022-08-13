import styles from "./quantityInput.module.scss";

import {
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai/index";

const QuantityInput = ({ quantity, setQuantity }) => {
  const onMinus = () => setQuantity((prev) => (prev - 1 > 0 ? prev - 1 : 1));
  const onPlus = () => setQuantity((prev) => prev + 1);

  return (
    <div className={styles.quantityContainer}>
      <span onClick={onMinus}>
        <AiOutlineMinusCircle className={styles.icon} />
      </span>
      <input
        className={styles.quantityInput}
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(+e.value.target)}
      />
      <span onClick={onPlus}>
        <AiOutlinePlusCircle className={styles.icon} />
      </span>
    </div>
  );
};

export default QuantityInput;
