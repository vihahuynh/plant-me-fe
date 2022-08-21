import styles from "./quantityInput.module.scss";

import {
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai/index";

const QuantityInput = ({ quantity, onChange }) => {
  return (
    <div className={styles.quantityContainer}>
      <span onClick={() => onChange(+quantity - 1)}>
        <AiOutlineMinusCircle className={styles.icon} />
      </span>
      <input
        className={styles.quantityInput}
        type="text"
        value={quantity}
        onChange={(e) => onChange(+e.value.target)}
      />
      <span onClick={() => onChange(+quantity + 1)}>
        <AiOutlinePlusCircle className={styles.icon} />
      </span>
    </div>
  );
};

export default QuantityInput;
