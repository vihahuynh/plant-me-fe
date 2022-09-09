import styles from "./radioInput.module.scss";

const RadioInput = ({ name, value, onChange, label, checked }) => {
  return (
    <div className={styles.radioInput}>
      <input
        type="radio"
        id={value}
        name="name"
        value={value}
        onChange={onChange}
      />
      <label htmlFor={value}>
        <span></span>
        {label}
      </label>
    </div >
  );
};

export default RadioInput;
