import styles from "./checkBox.module.scss";

const CheckBox = ({ name, value, onChange, label, checked }) => {
  return (
    <div className={styles.checkbox}>
      <input
        checked={checked}
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
