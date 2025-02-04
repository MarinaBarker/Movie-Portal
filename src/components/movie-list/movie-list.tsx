import React from 'react';
import MovieCard from '../movie-card/movie-card';
import styles from './movie-list.module.css'
import ErrorBoundary from '../../pages/error-boundary/error-boundary';
import { TMoviesListData } from '../../utils/type';

type MovieListProps = {
  movies: TMoviesListData[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <div className={styles.noResultsMessage}>Поиск не дал результатов</div>;
  }

  return (
    <ErrorBoundary>
    <div className={styles.movie}>
      {movies.map((movie) => (
        <MovieCard key={movie.Title} movie={movie}/>
      ))}
    </div>
    </ErrorBoundary>
  );
};

export default MovieList;