import { blogs } from "../../data";
import BlogItem from "./blogItem";
import styles from "./blogs.module.scss";

const Blogs = () => {
  return (
    <div className={styles.blogsContainer}>
      {blogs.map((b) => (
        <BlogItem key={b.id} blog={b} />
      ))}
    </div>
  );
};

export default Blogs;
