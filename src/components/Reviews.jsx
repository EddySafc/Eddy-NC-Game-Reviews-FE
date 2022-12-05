import { useEffect } from "react";
import { getReviews } from "../requests";

const Reviews = ({ reviews, setReviews, loading, setLoading }) => {
  useEffect(() => {
    getReviews().then((data) => {
      setReviews(data);
      setLoading(false);
    });
  }, []);

  if (loading === true) {
    return <section>Loading...</section>;
  }
  if (loading === false) {
    return (
      <section>
        <ul>
          {reviews.map((review) => {
            return (
              <li key={review.review_id}>
                <p>{review.title}</p>
                <p>{review.owner}</p>
                <p>{review.category}</p>
                <img
                  id="review-image"
                  src={review.review_img_url}
                  alt="no image available"
                ></img>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
};

export default Reviews;
