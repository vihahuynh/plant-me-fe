import { mainFeatures, subFeatures } from "../../data";
import MainFeatureItem from "./mainFeatureItem";
import SubFeatureItem from "./subFeatureItem";

import styles from "./features.module.scss";
import Subcribe from "./subcribe";

const Features = () => {
  return (
    <>
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
      <Subcribe />
    </>
  );
};

export default Features;
