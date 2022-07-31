import Button from "../UI/button";

import styles from "./subcribe.module.scss";

const Subcribe = () => {
  return (
    <div className={styles.container}>
      <div>
        <p>Join us for offers, care tips</p>
        <p>
          & <span>get 20% discount</span> on your first order
        </p>
        <form className={styles.form}>
          <input type="text" placeholder="Enter your email" />
          <Button
            text="Join us"
            size="medium"
            type="submit"
            className={styles.buttonCustom}
          />
        </form>
      </div>
      <img
        src="/images/haworthia-coarctata-plant.png"
        alt="Haworthia Coarctata Plant"
      />
    </div>
  );
};

export default Subcribe;
