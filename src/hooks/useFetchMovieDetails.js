import React,{ useState, useEffect } from 'react'
import axios from 'axios'

const useFetchMovieDetails = () => {
    //1e6ca77da6mshb321643d0219222p188a42jsn8f72a85f52ac
    const [loading, setLoading] = useState(false);
    const [movieData, setMovieData] = useState([]);
    const [error, setError] = useState("");
    const options = {
        method: "GET",
        url: "https://movies-api14.p.rapidapi.com/movies",
        headers: {
            'X-RapidAPI-Key': 'f802934094mshd4e93c23daba25cp12715bjsn4ed2c7e6a10d',
            'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
        }
    }
    const fetchMovieDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.request(options);
            // console.log(response.data);
            setMovieData(response.data)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error)
            console.log(error)
        }
    }
    useEffect(() => {
        fetchMovieDetails()
    },[])
  return {loading,error,movieData}
}

export default useFetchMovieDetails