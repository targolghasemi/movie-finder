import { useState, useEffect, useMemo,useRef } from "react";
import { debounce } from "lodash";

import "../App.css";

import Movies from "../components/Movies";
import api from "../services/api";
import Loader from "../components/Loader";

const Home = ({loading,setLoading,error,setError}) => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const observerRef = useRef(null)

  const searchHandler = (event) => {
    let searchInput = event.target.value;
    setInput(searchInput);
    debouncedSearch(searchInput);
  };

  const fetchMovies = async (query) => {
    if (!query.trim()) return;
    console.log("QUERY:", query);
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmZmZDA4OTEyNDA1NjBiY2ZiYmYwMzkxM2Y4N2Y5NSIsIm5iZiI6MTc4Njg5MDE0NC45NjEsInN1YiI6IjZhODFjN2EwNWJlMmJjM2Y4ZTk0MDg1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fTdQCFHMPyjLqpqLVvnzDk-FnBdpf-Mpv4c7r_9gCpU`,
        },
      }
    );

    const data = await response.json();
    console.log("SEARCH RESPONSE:", data);
    setMovies(data.results);
  };

  useEffect(()=>{
    const getMovies = async () => {
      try {
        setLoading(true)
        const response = await api.get("/movie/now_playing");
        setMovies(response.data.results);

      } catch (error) {
        setError("Failed to load movies")
      
      }finally{
        setLoading(false)
      }
    };

    getMovies()
  },[])



  const getSuggestions = async (value) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${value}`,
      {
        headers: {
            Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmZmZDA4OTEyNDA1NjBiY2ZiYmYwMzkxM2Y4N2Y5NSIsIm5iZiI6MTc4Njg5MDE0NC45NjEsInN1YiI6IjZhODFjN2EwNWJlMmJjM2Y4ZTk0MDg1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fTdQCFHMPyjLqpqLVvnzDk-FnBdpf-Mpv4c7r_9gCpU`
        },
      }
    );

    const data = await response.json();

    setSuggestions(data.results);
  };

  const debouncedSearch = useMemo(()=>{
    return debounce(getSuggestions,1000)
  },[])

  const handleSuggestionClick = (movie)=>{
    setInput(movie.title);
    setSuggestions([])
  }

  useEffect(()=>{
    const observer = new IntersectionObserver(()=>{
      console.log("اخر لیست");
    })

    observer.observe(observerRef.current)

    return()=>{
      observer.disconnect()
    }
  },[])



  return (
    <div className="container">
      <div className="container-card">
  
        <h1 className="title">🎬 Movie Finder</h1>
  
        <div className="search-section">
  
          <input
            className="search-input"
            value={input}
            placeholder="Search for a movie"
            onChange={searchHandler}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                fetchMovies(input);
              }
            }}
          />
  
          <button
            className="search-btn"
            onClick={() => fetchMovies(input)}
          >
            Search
          </button>
  
          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.slice(0, 5).map((movie) => (
                <div
                  className="suggestion"
                  key={movie.id}
                  onClick={() => handleSuggestionClick(movie)}
                >
                  {movie.title}
                </div>
              ))}
            </div>
          )}
  
        </div>
  
        {loading ? (
          <div className="status-container">
            <Loader />
            </div>
        ) : error ? (
          <div className="status-container">
            <p className="error">{error}</p>
            </div>
        ) : (
          <div className="movies-section">
            <Movies movies={movies} />
            <div ref={observerRef}></div>
            </div>
        )}
  
      </div>
    </div>
  );
}
export default Home;