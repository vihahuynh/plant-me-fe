import styles from "./searchBar.module.scss";
import { GoSearch } from "react-icons/go/index";

const SearchBar = ({ borderRadius = "circle" }) => {
  const searchBarClassNames = `${styles.searchContainer} ${styles[borderRadius]}`
  return (
    <div className={searchBarClassNames}>
      <input type="text" placeholder="Search here" />
      <GoSearch className={styles.icon} />
    </div>
  );
};

export default SearchBar;
