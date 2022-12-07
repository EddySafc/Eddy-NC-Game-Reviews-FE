import { getReviewsCommentsById } from "../requests";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import AddComment from "./AddComment";

const ReviewComments = ({ comments, setComments }) => {
  const [loading, setLoading] = useState(true);

  let review_id = useParams().review_id;

  useEffect(() => {
    getReviewsCommentsById(review_id).then((data) => {
      setComments(data);
      setLoading(false);
    });
  }, []);

  if (loading === false) {
    if (!comments.length) {
      return (
        <section>
          No Comments For This Review
          <AddComment />
        </section>
      );
    } else
      return (
        <section>
          <AddComment />
          <ul>
            {comments.map((comment) => {
              return (
                <li key={comment.comment_id} className="comment_list">
                  <p>Author:{comment.author}</p>
                  <p>Comment:{comment.body}</p>
                  <p>Created at:{comment.created_at}</p>
                  <p>Votes:{comment.votes}</p>
                </li>
              );
            })}
          </ul>
        </section>
      );
  }
  if (loading === true) {
    return <section>Loading...</section>;
  }
};

export default ReviewComments;
