import { useEffect } from "react";
import { getReviews } from "../requests";
import { Link } from "react-router-dom";
import { useState } from "react";

const Reviews = ({ reviews, setReviews }) => {
  const [loading, setLoading] = useState(true);
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
