import { useParams } from "react-router-dom";
import { getReviewsById } from "../requests";
import { useEffect } from "react";

const SingleReview = ({ review, setReview }) => {
  let review_id = useParams().review_id;
  useEffect(() => {
    getReviewsById(review_id).then((data) => {
      setReview(data);
    });
  }, []);

  return (
    <section>
      <p>{review.owner}</p>
      <p>{review.title}</p>
      <p>{review.review_body}</p>
      <p>{review.category}</p>
      <p>{review.owner}</p>
      <p>{review.designer}</p>
      <p>{review.comment_count}</p>
      <p>{review.created_at}</p>
      <p>{review.votes}</p>
      <img
        id="single-review-image"
        src={review.review_img_url}
        className="single_review_image"
      ></img>
    </section>
  );
};

export default SingleReview;
