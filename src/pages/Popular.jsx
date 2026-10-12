import { useEffect, useState } from "react"
import api from "../services/api"
import Movies from "../components/Movies"
import Loader from "../components/Loader"

const Popular = ({loading,setLoading,error,setError})=>{

    const [movies, setMovies] = useState([])


    useEffect(()=>{
        const getPopularMovies = async()=>{
            try {
                setLoading(true)
                const response = await api.get("/movie/popular");
    
                 setMovies(response.data.results)
            } catch (error) {
                setError("Failed to load movies")
            }finally{
                setLoading(false)
            }
        }
        getPopularMovies()
    },[setError, setLoading])



    return(
        <div className="container">
            <div className="container-card">
                <h1 className="title"> 🎬 Popular Movies</h1>

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
                    </div>
                )}

            </div>
        </div>
    )
}

export default Popular;