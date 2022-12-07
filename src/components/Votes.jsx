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
    setUpDisabled(true);
    setDownDisabled(false);
    patchReviewVotes(review_id, 1).catch(() => {
      setVoteCount((currCount) => currCount - 1);
      setUpDisabled(false);
      setDownDisabled(true);
      setErr("something went wrong please try again");
    });
  };

  const handleClickDown = () => {
    setVoteCount((currCount) => currCount - 1);
    setErr(null);
    setDownDisabled(true);
    setUpDisabled(false);
    patchReviewVotes(review_id, -1).catch(() => {
      setVoteCount((currCount) => currCount + 1);
      setDownDisabled(false);
      setUpDisabled(true);
      setErr("something went wrong please try again");
    });
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
