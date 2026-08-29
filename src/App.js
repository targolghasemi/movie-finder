import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Popular from "./pages/Popular";
import Home from "./pages/Home";
import Toprated from "./pages/Toprated";
import MovieDetails from "./components/MovieDetails";
import { useState } from "react";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  return (
  <>
    <Navbar/>

    <Routes>

      <Route path="/" element={<Home loading={loading} setLoading={setLoading} error={error} setError={setError}/>}/>
      <Route path="/popular" element={<Popular loading={loading} setLoading={setLoading} error={error} setError={setError}/>}/>
      <Route path="/top-rated" element={<Toprated loading={loading} setLoading={setLoading} error={error} setError={setError}/>}/>
      <Route path="/movie/:id" element={<MovieDetails loading={loading} setLoading={setLoading} error={error} setError={setError}/>}/>


    </Routes>

  </>

  );
};

export default App;

