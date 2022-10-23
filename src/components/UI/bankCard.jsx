import styles from "./bankCard.module.scss";

const BankCard = ({ bankLogo }) => {
  return (
    <div className={styles.container}>
      <img src={bankLogo} alt="bank-logo" />
      <p>
        <span>Account name: </span>Hanemo
      </p>
      <p>
        <span>Bank account number: </span>xxxx xxxx xxxx xxxx
      </p>
      <p>
        <span>Bank branch: </span>dolor sit amet consectetur
      </p>
    </div>
  );
};

export default BankCard;
