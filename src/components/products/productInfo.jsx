import Accordion from "../UI/accordion";

import styles from "./productInfo.module.scss";

import { CgArrowLongRight } from "react-icons/cg/index";
import {
  TbTemperature,
  TbSun,
  TbTree,
  TbDroplet,
  TbNote,
} from "react-icons/tb/index";

import { plantNotes } from "../../data";

const getIcon = (icon) => {
  switch (icon) {
    case "Light":
      return <TbSun className={styles.icon} />;
    case "Watering":
      return <TbDroplet className={styles.icon} />;
    case "Where to grow":
      return <TbTree className={styles.icon} />;
    case "Maintenace":
      return <TbTemperature className={styles.icon} />;
    default:
      return <TbNote className={styles.icon} />;
  }
};

const ProductInfo = ({ product }) => {
  return (
    <div className={styles.container}>
      <Accordion title="Description" active={true}>
        <div className={styles.description}>
          <p className={styles.about}>{product.about}</p>
          {plantNotes.map((note) => (
            <div key={note.id} className={styles.note}>
              <CgArrowLongRight className={styles.icon} />
              <p>{note.text}</p>
            </div>
          ))}
        </div>
      </Accordion>
      <Accordion title="Living Condition">
        <div className={styles.livingConditions}>
          {product.livingConditions.map((item) => (
            <div className={styles.condition} key={item.id}>
              {getIcon(item.title)}
              <div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Accordion>
      <Accordion title="Plant care">
        <div className={styles.plantCare}>
          {product.plantCare.map((plantCareTip) => (
            <div key={plantCareTip.id} className={styles.plantCareTip}>
              <h4>{plantCareTip.title}: </h4>
              <p>{plantCareTip.text}</p>
            </div>
          ))}
        </div>
      </Accordion>
      <Accordion title="Common Problems">
        <div className={styles.commonProblems}>
          {product.commonProblems.map((problem) => (
            <div key={problem.id} className={styles.problem}>
              <h4>{problem.title}</h4>
              <p>{problem.text}</p>
            </div>
          ))}
        </div>
      </Accordion>
      <Accordion title="Style and Decor">
        <div className={styles.decorTips}>
          {product.decorTips.map((decorTip) => (
            <div key={decorTip.id} className={styles.decorTip}>
              <h4>{decorTip.title}: </h4>
              <p>{decorTip.text}</p>
            </div>
          ))}
        </div>
      </Accordion>
    </div>
  );
};

export default ProductInfo;
