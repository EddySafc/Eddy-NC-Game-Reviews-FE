import { useEffect } from "react";
import { getReviews } from "../requests";
import { Link } from "react-router-dom";
import { useState } from "react";
import moment from "moment";

const Reviews = ({ reviews, setReviews }) => {
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState(null);
  useEffect(() => {
    getReviews().then((data) => {
      if (sort === "newest-oldest" || sort === null) {
        setReviews(
          [...data].sort(
            (a, b) =>
              moment(b.created_at).format("YYYYMMDDHHmmss") -
              moment(a.created_at).format("YYYYMMDDHHmmss")
          )
        );
        setLoading(false);
      }
      if (sort === "oldest-newest") {
        setReviews(
          [...data].sort(
            (a, b) =>
              moment(a.created_at).format("YYYYMMDDHHmmss") -
              moment(b.created_at).format("YYYYMMDDHHmmss")
          )
        );
      }
      if (sort === "votes_asc") {
        setReviews([...data].sort((a, b) => a.votes - b.votes));
      }
      if (sort === "votes_desc") {
        setReviews([...data].sort((a, b) => b.votes - a.votes));
      }
      if (sort === "comments_asc") {
        setReviews([...data].sort((a, b) => a.comment_count - b.comment_count));
      }
      if (sort === "comments_desc") {
        setReviews([...data].sort((a, b) => b.comment_count - a.comment_count));
      }
    });
  }, [sort]);

  if (loading === true) {
    return <section>Loading...</section>;
  }
  if (loading === false) {
    return (
      <section>
        Sort By:
        <button
          onClick={() => {
            setSort("newest-oldest");
          }}
        >
          newest to oldest
        </button>
        <button
          onClick={() => {
            setSort("oldest-newest");
          }}
        >
          oldest to newest
        </button>
        <button
          onClick={() => {
            setSort("votes_asc");
          }}
        >
          votes ascending
        </button>
        <button
          onClick={() => {
            setSort("votes_desc");
          }}
        >
          votes Descending
        </button>
        <button
          onClick={() => {
            setSort("comments_asc");
          }}
        >
          comment count ascending
        </button>
        <button
          onClick={() => {
            setSort("comments_desc");
          }}
        >
          comment count Descending
        </button>
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
