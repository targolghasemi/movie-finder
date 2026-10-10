import { entries } from "lodash";
import { useEffect, useRef, useState } from "react";
import Movie from "./Movie";


const Movies = ({movies})=>{
    const [visibleMovies, setVisibleMovies] = useState(4)
    const observerTarget = useRef(null);

    useEffect(()=>{
        const observer = new IntersectionObserver((entries)=>{
            if (entries[0].isIntersecting && visibleMovies < movies.length ) {
                setVisibleMovies((prev)=>prev + 4)
            }
        })

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return()=>{
            observer.disconnect()
        }
    },[movies, visibleMovies])


    return(
        <div>
             <div className="movies-list">
            {movies.slice(0,visibleMovies).map((movie)=>(
                <Movie key={movie.id} movie={movie}/>
            ))}
             </div>

             <div ref={observerTarget}></div>
        </div>

        
    )
}

export default Movies;