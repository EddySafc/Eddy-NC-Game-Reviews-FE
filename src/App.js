import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";
import SingleReview from "./components/SingleReview";
import ReviewComments from "./components/ReviewComments";
import Users from "./components/Users";
import { logInContext } from "./components/Users";

function App() {
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");

  return (
    <BrowserRouter>
      <logInContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <div className="App">
          <Header />
          <Nav />
          <Routes>
            <Route
              path="/"
              element={<Reviews setReviews={setReviews} reviews={reviews} />}
            />

            <Route path="/users" element={<Users />} />
            <Route
              path="/reviews/:review_id"
              element={<SingleReview review={review} setReview={setReview} />}
            />
            <Route
              path="/reviews/:review_id/comments"
              element={
                <ReviewComments comments={comments} setComments={setComments} />
              }
            />
          </Routes>
        </div>
      </logInContext.Provider>
    </BrowserRouter>
  );
}

export default App;
