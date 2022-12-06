import { useEffect } from "react";
import { getReviews } from "../requests";
import { Link } from "react-router-dom";

const Reviews = ({ reviews, setReviews, loading, setLoading }) => {
  useEffect(() => {
    setLoading(true);
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
              <li className="listed-review" key={review.review_id}>
                <p>{review.title}</p>
                <p>{review.owner}</p>
                <img id="review-image" src={review.review_img_url}></img>
                <p>
                  <Link to={`/reviews/${review.review_id}`}>
                    See Further Details
                  </Link>
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
};

export default Reviews;
