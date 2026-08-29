import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../services/api";
import Loader from "./Loader";

const MovieDetails = ({ loading, setLoading, error, setError }) => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setError(null);
        setLoading(true);

        const response = await api.get(`/movie/${id}`);

        setMovie(response.data);
      } catch (error) {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="status-container">
          <Loader />
        </div>
      ) : error ? (
        <div className="status-container">
          <p className="error">{error}</p>
        </div>
      ) : movie ? (
        <div className="movie-content">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />

          <div className="movie-info">
            <div className="information">
              <h3 className="movie-title">{movie.title}</h3>

              <span className="rate">
                ⭐ {movie.vote_average}
              </span>

              <span className="genre">
                {movie.genres.map((genre) => genre.name).join(", ")}
              </span>

              <p className="overview">
                {movie.overview}
              </p>
            </div>

            <div className="extra-information">
              <div className="extra-item duration">
                <span>Duration :</span>
                <p>{movie.runtime} min</p>
              </div>

              <div className="extra-item language">
                <span>Language :</span>
                <p>{movie.original_language}</p>
              </div>

              <div className="extra-item release-date">
                <span>Release Date :</span>
                <p>{movie.release_date}</p>
              </div>
            </div>

            <Link to="/" className="movie-btn">
              Return to home
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MovieDetails;