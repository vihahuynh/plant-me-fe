import styles from "./searchBar.module.scss";
import { GoSearch } from "react-icons/go/index";

const SearchBar = () => {
  return (
    <div className={styles.searchContainer}>
      <input type="text" placeholder="Search here" />
      <GoSearch className={styles.icon} />
    </div>
  );
};

export default SearchBar;
