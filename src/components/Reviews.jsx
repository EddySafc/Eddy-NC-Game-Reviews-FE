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
              <li class="listed-review" key={review.review_id}>
                <p>{review.title}</p>
                <p>{review.owner}</p>
                <p>{review.category}</p>
                <img id="review-image" src={review.review_img_url}></img>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
};

export default Reviews;
