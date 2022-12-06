import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";
import SingleReview from "./components/SingleReview";

function App() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({});

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <Reviews
                setReviews={setReviews}
                reviews={reviews}
                loading={loading}
                setLoading={setLoading}
              />
            }
          />
          <Route
            path="/reviews/:review_id"
            element={
              <SingleReview
                review={review}
                setReview={setReview}
                loading={loading}
                setLoading={setLoading}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
