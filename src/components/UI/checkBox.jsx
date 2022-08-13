import styles from "./checkBox.module.scss";

const CheckBox = ({ name, value, onChange, label }) => {
  return (
    <div className={styles.checkbox}>
      <input
        className={styles.option}
        type="checkbox"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={name}>
        <span></span>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
