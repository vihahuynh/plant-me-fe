import styles from "./subFeatureItem.module.scss";

const SubFeatureItem = ({ subFeature }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={subFeature.url} alt={subFeature.title} />
      </div>
      <div>
        <h5 className={styles.title}>{subFeature.title}</h5>
        <p className={styles.desc}>{subFeature.desc}</p>
      </div>
    </div>
  );
};

export default SubFeatureItem;
