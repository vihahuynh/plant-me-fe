import Wrapper from "../../components/layout/wrapper";
import UserReviews from "../../components/reviews/userReviews";
import UserLeftMenu from "../../components/layout/userLetfMenu/userLeftMenu";

import styles from "./reviewHistory.module.scss";

const ReviewHistory = () => {
  return (
    <Wrapper>
      <div className={styles.main}>
        <UserLeftMenu />
        <UserReviews />
      </div>
    </Wrapper>
  );
};

export default ReviewHistory;
