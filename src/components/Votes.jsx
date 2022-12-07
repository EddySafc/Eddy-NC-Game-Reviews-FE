import { patchReviewVotes } from "../requests";
import { useState } from "react";

export default function Votes({ review_id, review }) {
  const [voteCount, setVoteCount] = useState(review.votes);
  const [upDisabled, setUpDisabled] = useState(false);
  const [downDisabled, setDownDisabled] = useState(false);
  const [err, setErr] = useState(null);

  const handleClickUp = () => {
    setVoteCount((currCount) => currCount + 1);
    setErr(null);
    patchReviewVotes(review_id, 1).catch(() => {
      setVoteCount((currCount) => currCount - 1);
      setErr("something went wrong please try again");
    });
    setUpDisabled(true);
    setDownDisabled(false);
  };

  const handleClickDown = () => {
    setVoteCount((currCount) => currCount - 1);
    setErr(null);
    patchReviewVotes(review_id, -1).catch(() => {
      setVoteCount((currCount) => currCount + 1);
      setErr("something went wrong please try again");
    });
    setDownDisabled(true);
    setUpDisabled(false);
  };

  if (err) return <p>{err}</p>;
  return (
    <div>
      <p>Votes:{voteCount}</p>
      <button onClick={handleClickUp} disabled={upDisabled}>
        UpVote
      </button>
      <button onClick={handleClickDown} disabled={downDisabled}>
        DownVote
      </button>
    </div>
  );
}
