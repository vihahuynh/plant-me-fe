import LinkButton from "./../UI/buttons/linkbutton";
import styles from "./blogItem.module.scss";

const BlogItem = ({ blog }) => {
  return (
    <div className={styles.container}>
      <img src={blog.imageUrl} alt={blog.title} />
      <div className={styles.blogDetails}>
        <span className={styles.publicDate}>{blog.publicDate}</span>
        <h5 className={styles.title}>{blog.title}</h5>
        <LinkButton text="Read more" size="small" />
      </div>
    </div>
  );
};

export default BlogItem;
