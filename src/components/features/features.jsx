import { mainFeatures, subFeatures } from "../../data";
import MainFeatureItem from "./mainFeatureItem";
import SubFeatureItem from "./subFeatureItem";

import styles from "./features.module.scss";

const Features = () => {
  return (
    <section className={styles.container}>
      <h2>Why People Choose Us?</h2>
      <div className={styles.mainFeaturesContainer}>
        {mainFeatures.map((f) => (
          <MainFeatureItem key={f.id} mainFeature={f} />
        ))}
      </div>
      <div className={styles.subFeaturesContainer}>
        {subFeatures.map((f) => (
          <SubFeatureItem key={f.id} subFeature={f} />
        ))}
      </div>
    </section>
  );
};

export default Features;
