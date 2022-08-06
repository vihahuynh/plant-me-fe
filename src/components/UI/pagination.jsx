import styles from "./pagination.module.scss";

const Pagination = ({ page, setPage, totalPages }) => {
  const onNext = () =>
    setPage((curPage) => (curPage === totalPages ? totalPages : curPage + 1));

  const onPrevious = () =>
    setPage((curPage) => (curPage === 1 ? 1 : curPage - 1));

  const showPages = () => {
    let start = page - 2 > 0 ? page - 2 : 1;
    let end = start + 4 < totalPages ? start + 4 : totalPages;
    if (totalPages > 5 && end - start < 5) {
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
              onClick={(e) => setPage(+e.target.innerText)}
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
