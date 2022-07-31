import styles from "./mainFeatureItem.module.scss";

const MainFeatureItem = ({ mainFeature }) => {
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>{mainFeature.title}</h5>
      <p className={styles.desc}>{mainFeature.desc}</p>
    </div>
  );
};

export default MainFeatureItem;
