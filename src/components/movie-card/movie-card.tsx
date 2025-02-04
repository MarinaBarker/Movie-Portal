import { FC, useState } from 'react';
import styles from './movie-card.module.css';
import { TMoviesListData } from '../../utils/type';
import { NavLink } from 'react-router-dom';

type MovieCardProps = {
  movie: TMoviesListData
};

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  return (
    <NavLink to={`/movie/${movie.imdbID}`}>
			<div className={styles.card}>
				{movie.Poster === 'N/A' 
				? <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/300px-No-Image-Placeholder.svg.png' alt='No images' /> 
				: <img src={movie.Poster} alt={movie.Title} className={styles.poster} />}
				<h3 className={styles.title}>{movie.Title} ({movie.Year})</h3>
        </div>
		</NavLink>
  );
};

export default MovieCard;