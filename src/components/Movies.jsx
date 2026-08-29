import Movie from "./Movie";


const Movies = ({movies})=>{


    return(
        <div className="movies-list">
            {movies.map((movie)=>(
                <Movie key={movie.id} movie={movie}/>
            ))}
        </div>
    )
}

export default Movies;