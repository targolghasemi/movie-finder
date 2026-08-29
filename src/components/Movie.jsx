import genres from "../data/genres";
import { Link } from "react-router-dom";

const Movie = ({movie})=>{
    return(
        <div className="movie-card">
               <img
               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
               alt={movie.title}/>
               <div className="about-section">
                <h5 className="movie-name">{movie.title}</h5>
                <span className="rate">⭐  {movie.vote_average}</span>
                <span className="year">{movie.release_date?.split("-")[0]}</span>
                <span className="genre">
                    {movie.genre_ids?.map((id) => genres[id]).join(", ")}
                </span>
                <Link to={`/movie/${movie.id}`} className="details-btn">See the details</Link>
               </div>
        </div>
    )
}

export default Movie;