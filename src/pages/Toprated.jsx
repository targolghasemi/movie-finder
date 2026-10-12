import { useEffect, useState } from "react"
import api from "../services/api"
import Movies from "../components/Movies"
import Loader from "../components/Loader";

const Toprated = ({loading,setLoading,error,setError})=>{
  console.log("TOP RATED COMPONENT");

    const [movies, setMovies] = useState([])


    useEffect(()=>{
      const getTopRatedMovies = async () => {
        try {
          setLoading(true)
          const response = await api.get("/movie/top_rated");
      
          setMovies(response.data.results);
        } catch (error) {
          setError("Failed to load movies")
        } finally{
          setLoading(false)
        }
      };
      getTopRatedMovies()
    },[setError,setLoading])



    return(
        <div className="container">
            <div className="container-card">
                <h1 className="title"> 🎬 Top Rated Movies</h1>

                {loading?(
                    <div className="status-container">
                          <Loader/>
                     </div>
                ):error?(
                  <div className="status-container">
                    <p className="error">{error}</p>
                  </div>
                ):(
                  <div className="movies-section">
                        <Movies movies={movies}/>
                   </div>
                )}

            </div>
        </div>
    )
}

export default Toprated;