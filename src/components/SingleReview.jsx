import { useParams } from "react-router-dom";
import { getReviewsById } from "../requests";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Votes from "./Votes";

const SingleReview = ({ review, setReview }) => {
  const [loading, setLoading] = useState(true);
  let review_id = useParams().review_id;
  useEffect(() => {
    getReviewsById(review_id).then((data) => {
      setReview(data);
      setLoading(false);
    });
  }, []);
  if (loading === false) {
    return (
      <section>
        <p>Owner:{review.owner}</p>
        <p>Title:{review.title}</p>
        <p>Review:{review.review_body}</p>
        <p>Category:{review.category}</p>
        <p>Designer:{review.designer}</p>
        <p>Created at:{review.created_at}</p>
        <p>Comment Count:{review.comment_count}</p>

        <p>
          <Link to={`/reviews/${review.review_id}/comments`}>
            View Comments
          </Link>
        </p>

        <img
          id="single-review-image"
          src={review.review_img_url}
          className="single_review_image"
        ></img>
      </section>
    );
  }

  if (loading === true) {
    return <section>Loading...</section>;
  }
};

export default SingleReview;
