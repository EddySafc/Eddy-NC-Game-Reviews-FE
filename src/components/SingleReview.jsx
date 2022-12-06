import { useParams } from "react-router-dom";
import { getReviewsById } from "../requests";
import { useEffect } from "react";

const SingleReview = ({ review, setReview, loading, setLoading }) => {
  let review_id = useParams().review_id;
  useEffect(() => {
    setLoading(true);
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
        <p>Comment Count:{review.comment_count}</p>
        <p>Created at:{review.created_at}</p>
        <p>Votes:{review.votes}</p>
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
