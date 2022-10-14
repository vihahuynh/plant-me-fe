import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./pagination.module.scss";

const Pagination = ({ page, setPage, totalPages, itemsPerPage }) => {
  const history = useHistory()
  const queries = history.location.search.slice(1)
  const otherQueries = queries.split("&").filter(q => !q.includes("skip") && !q.includes("limit")).join("&")

  useEffect(() => {
    if (!queries.includes("") || !queries.includes("limit")) {
      history.push({
        search: `skip=${(page - 1) * itemsPerPage}&limit=${itemsPerPage}${otherQueries ? `&${otherQueries}` : ''}`
      })
    }
  }, [queries, history, itemsPerPage, page, otherQueries])

  const onNext = () => {
    setPage((curPage) => {
      const newPage = curPage + 1 >= totalPages ? totalPages : curPage + 1
      history.push({
        search: `skip=${(newPage - 1) * itemsPerPage}&limit=${itemsPerPage}${otherQueries ? `&${otherQueries}` : ''}`
      })
      return newPage
    });
  }

  const onPrevious = () => {
    setPage((curPage) => {
      const newPage = curPage === 1 ? 1 : curPage - 1
      history.push({
        search: `skip=${(newPage - 1) * itemsPerPage}&limit=${itemsPerPage}${otherQueries ? `&${otherQueries}` : ''}`
      })
      return newPage
    });
  }

  const onSelectPage = (value) => {
    setPage(value)
    history.push({
      search: `skip=${(value - 1) * itemsPerPage}&limit=${itemsPerPage}${otherQueries ? `&${otherQueries}` : ''}`
    })
  }

  const showPages = () => {
    let start = page - 2 > 0 ? page - 2 : 1;
    let end = start + 4 < totalPages ? start + 4 : totalPages;
    if (totalPages >= 5 && end - start < 5) {
      start = end - 4;
    }
    return Array.from(
      { length: totalPages < 5 ? totalPages : 5 },
      (_, i) => i + start
    );
  };

  const pages = showPages();

  return (
    <div className={styles.container}>
      <div className={styles.pagesContainer}>
        <span
          className={page === 1 ? styles.disabled : ""}
          onClick={onPrevious}
        >
          Previous
        </span>
        <ul className={styles.pages}>
          {pages.map((i) => (
            <li
              key={i}
              className={i === page ? styles.current : ""}
              onClick={(e) => onSelectPage(+e.target.innerText)}
            >
              {i}
            </li>
          ))}
        </ul>
        <span
          className={page === totalPages ? styles.disabled : ""}
          onClick={onNext}
        >
          Next
        </span>
      </div>
    </div>
  );
};

export default Pagination;
