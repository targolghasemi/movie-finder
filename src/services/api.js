import axios from "axios";
const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmZmZDA4OTEyNDA1NjBiY2ZiYmYwMzkxM2Y4N2Y5NSIsIm5iZiI6MTc4Njg5MDE0NC45NjEsInN1YiI6IjZhODFjN2EwNWJlMmJjM2Y4ZTk0MDg1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fTdQCFHMPyjLqpqLVvnzDk-FnBdpf-Mpv4c7r_9gCpU"

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  });
  

export default api;