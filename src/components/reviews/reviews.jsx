import { reviews } from "../../data";
import ReviewItem from "./reviewItem";

const Reviews = () => {
    return <div>
        {reviews.map(review => <ReviewItem key={review.id} review={review} />)}
    </div>
}

export default Reviews