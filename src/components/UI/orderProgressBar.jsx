import styles from "./orderProgressBar.module.scss"

const steps = [
  {
    id: 1,
    label: 'Select campaign settings',
    time: '2021-02-01'
  },
  {
    id: 2,
    label: 'Create an ad group',
    time: '2021-02-01'
  },
  {
    id: 3,
    label: 'Create an ad',
    time: '2021-02-01'
  },
];

const OrderProgressBar = () => {
  return (
    <ul className={styles.stepList}>
      {steps.map(step =>
        <li key={step.id} className={styles.stepItem}>
          <p className={styles.stepTitle}>{step.label}</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing eles, sapiente veniam quasi quod deleniti delectus neque.</p>
          <p>{step.time}</p>
        </li>
      )}
    </ul>
  );
}

export default OrderProgressBar
