import axios from 'axios';

const { TMDB_API_KEY } = process.env;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (genre?: string, keyword?: string, page: number = 1) => {
  const url = `${BASE_URL}/discover/movie`;
  const params: { api_key: string; language?: string; with_genres?: string; page?: number } = {
    api_key: TMDB_API_KEY!,
    language: 'es-ES',
    page,
  };

  if (genre) {
    params.with_genres = genre;
  }

  const response = await axios.get(url, { params });
  const movies = response.data;

  // Filtrar películas por palabra clave si se proporciona
  const filteredMovies = keyword
    ? movies.results.filter((movie: { title: string }) => movie.title.toLowerCase().includes(keyword.toLowerCase()))
    : movies.results;

  // Devolver la estructura completa incluyendo paginación
  return {
    ...movies,
    results: filteredMovies,
  };
};

export const fetchGenres = async () => {
  const url = `${BASE_URL}/genre/movie/list`;
  const params = { api_key: TMDB_API_KEY!, language: 'es-ES' };

  const response = await axios.get(url, { params });
  const { genres } = response.data;
  return genres;
};

export const fetchMovieDetail = async (id: number) => {
  const url = `${BASE_URL}/movie/${id}`;
  const params = { api_key: TMDB_API_KEY!, language: 'es-ES' };
  const response = await axios.get(url, { params });
  return response.data;
};

export const fetchSimilarMovies = async (id: number) => {
  const url = `${BASE_URL}/movie/${id}/similar`;
  const params = { api_key: TMDB_API_KEY!, language: 'es-ES' };
  const response = await axios.get(url, { params });
  return response.data;
};
