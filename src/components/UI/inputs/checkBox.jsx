import styles from "./checkBox.module.scss";

const CheckBox = ({
  name,
  value,
  onChange,
  label,
  checked,
  disabled = false,
}) => {
  const checkBoxClassNames = `${styles.checkbox} ${
    disabled ? styles.disabled : ""
  }`;
  return (
    <div className={checkBoxClassNames}>
      <input
        checked={checked}
        type="checkbox"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={name}>
        <span></span>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
