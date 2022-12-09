import { getReviewsCommentsById } from "../requests";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import AddComment from "./AddComment";
import { deleteCommentById } from "../requests";
import { useContext } from "react";
import { logInContext } from "./Users";

const ReviewComments = ({ comments, setComments }) => {
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const { loggedInUser, setLoggedInUser } = useContext(logInContext);

  let review_id = useParams().review_id;

  useEffect(() => {
    getReviewsCommentsById(review_id).then((data) => {
      setComments(data);
      setLoading(false);
    });
  }, [comments]);

  if (loading === false) {
    if (!comments.length) {
      return (
        <section>
          No Comments For This Review
          <AddComment comments={comments} setComments={setComments} />
        </section>
      );
    }
    if (deleting === true) {
      console.log("deleting comment");
      return <section>Deleting Comment...</section>;
    } else
      return (
        <section>
          <AddComment comments={comments} setComments={setComments} />
          <ul>
            {comments.map((comment) => {
              return (
                <li key={comment.comment_id} className="comment_list">
                  <p>Author:{comment.author}</p>
                  <p>Comment:{comment.body}</p>
                  <p>
                    Created at:
                    {moment(comment.created_at).format(`DD/MM/YY [at] HH:mm`)}
                  </p>
                  <p>Votes:{comment.votes}</p>
                  <button
                    onClick={() => {
                      setDeleting(true);

                      deleteCommentById(comment.comment_id).then(() => {
                        setDeleting(false);
                      });
                    }}
                    disabled={comment.author !== loggedInUser}
                  >
                    Delete
                  </button>
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
