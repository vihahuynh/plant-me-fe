import { useState } from "react"

import styles from "./reviewItem.module.scss"
import Rating from "@mui/material/Rating";
import Moment from "react-moment"


import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai/index"

const ReviewItem = ({ review }) => {
    const [wasLiked, setWasLiked] = useState(false)
    const [wasDisliked, setWasDisliked] = useState(false)

    const onLike = () => {
        setWasLiked(prev => !prev)
        setWasDisliked(false)
    }

    const onDislike = () => {
        setWasDisliked(prev => !prev)
        setWasLiked(false)
    }

    return <div className={styles.container}>
        <img className={styles.avatar} src={review.avatarUrl || "/images/default-avatar.png"} alt="user" />
        <div className={styles.review}>
            <h5>{review.user.username}</h5>
            <Rating className={styles.rating} name="read-only" value={review.rating} readOnly />
            <div className={styles.content}>
                <h5>{review.title}</h5>
                <p>{review.content}</p>
            </div>
        </div>
        <div className={styles.left}>
            <Moment format="YYYY-MM-DD">{review.createdAt}</Moment>
            <div className={styles.isHelpful}>
                {/* <p>Was this review helpful?</p> */}
                <div className={styles.like}>
                    <AiTwotoneLike className={styles.icon} onClick={onLike} />
                    <span>{wasLiked ? review.like + 1 : review.like}</span>
                </div>
                <div className={styles.dislike}>
                    <AiTwotoneDislike className={styles.icon} onClick={onDislike} />
                    <span>{wasDisliked ? review.dislike + 1 : review.dislike}</span >
                </div>
            </div>

        </div>
    </div>
}

export default ReviewItem