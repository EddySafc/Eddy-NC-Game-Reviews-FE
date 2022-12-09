import { useEffect } from "react";
import { getReviews } from "../requests";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import moment from "moment";

const Reviews = ({
  reviews,
  setReviews,
  sortByOrder,
  setSortByOrder,
  sortByProperty,
  setSortByProperty,
}) => {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const addOrderButton = (order, buttonName) => {
    return (
      <button
        onClick={() => {
          setSortByOrder(order);
        }}
      >
        {buttonName}
      </button>
    );
  };

  const addOrderByButton = (property, buttonName) => {
    return (
      <button
        onClick={() => {
          setSortByProperty(property);
        }}
      >
        {buttonName}
      </button>
    );
  };

  useEffect(() => {
    getReviews(sortByOrder, sortByProperty, null).then((data) => {
      setSearchParams(`order=${sortByOrder}&sort_by=${sortByProperty}`);
      setReviews(data);
      setLoading(false);
    });
  }, [sortByOrder, sortByProperty]);

  if (loading === true) {
    return <section>Loading...</section>;
  }
  if (loading === false) {
    return (
      <section>
        <div>
          order:
          {addOrderButton("ASC", "Ascending")}
          {addOrderButton("DESC", "Descending")}
          Order is: {sortByOrder}ENDING
        </div>
        <div>
          order by:
          {addOrderByButton("created_at", "created at")}
          {addOrderByButton("votes", "votes")}
          {addOrderByButton("comment_count", "comments")}
          Order is: {sortByProperty}
        </div>

        <ul>
          {reviews.map((review) => {
            return (
              <li className="listed-review" key={review.review_id}>
                <p>Title:{review.title}</p>

                <p>Votes:{review.votes}</p>
                <p>Comment Count:{review.comment_count}</p>
                <p>{moment(review.created_at).format(`DD/MM/YY [at] HH:mm`)}</p>
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
