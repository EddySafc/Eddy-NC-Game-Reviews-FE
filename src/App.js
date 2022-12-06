import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";

function App() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
