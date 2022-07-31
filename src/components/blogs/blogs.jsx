import { blogs } from "../../data";
import BlogItem from "./blogItem";
import styles from "./blogs.module.scss";

const Blogs = () => {
  return (
    <section className={styles.container}>
      <h2>Read Our Blogs</h2>
      <div className={styles.blogsContainer}>
        {blogs.map((b) => (
          <BlogItem key={b.id} blog={b} />
        ))}
      </div>
    </section>
  );
};

export default Blogs;
