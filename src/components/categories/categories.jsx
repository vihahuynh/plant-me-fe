import styles from "./categories.module.scss";

const Categories = () => {
  return (
    <div className={styles.grid}>
      <div className={styles.firstGrid}>
        <div>
          <h5>All</h5>
          <h5>About Castus</h5>
        </div>
        <img src="/images/castus.png" alt="castus" />
      </div>
      <div className={styles.secondGrid}>
        <h5>Outdoor Plants</h5>
        <img
          src="/images/philodendronb-birkin-plant.png"
          alt="philodendronb-birkin-plant"
        />
      </div>
      <div className={styles.thridGrid}>
        <h5>Indoor Plants</h5>
        <img
          src="/images/fittonia-green-plant.png"
          alt="fittonia green plant"
        />
      </div>
    </div>
  );
};
export default Categories;
