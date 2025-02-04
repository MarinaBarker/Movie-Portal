import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../../utils/api";
import { Preloader } from "../../components/preloader/preloader";
import styles from './movie.module.css';
import { useFavorite } from "../../hooks/useFavorite";
import { ButtonLike } from "../../components/button-like/button-like";

export const Movie = () => {
    const { id } = useParams();
    const { data: movie, isLoading } = useGetMovieByIdQuery({ movieId: String(id)});
    const { inFavorite, addInFavorite } = useFavorite(id);

    if(isLoading) {
      return <Preloader />
    }
  
    if (!movie) return <span className="error404">Информация отсутствует</span>
  
    return (
      <section>
        <div className={styles.container}>
            <div className={styles.movieContainer}>
              {movie.Poster === 'N/A' 
              ? <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/300px-No-Image-Placeholder.svg.png' 
                  alt="No images" 
                  width="150"
                  height="150"
                /> 
                : <img src={movie.Poster} alt={movie.Title} className={styles.poster} />}
                <div className={styles.favorites}>
                <ButtonLike onClick={addInFavorite} active={inFavorite}/>
                </div>
            </div>
              
            <div>
            <div className={styles.title}>{movie.Title} ({movie.Year})</div>
            <div className={styles.box}>
              <p className={styles.content}>Информация о {movie.Type}</p>
              <div className='movie-container_content-infoItem'>
                <span className={styles.content}>Genre: </span>
                <span className=''>{movie.Genre}</span>
              </div>
              <div className='movie-container_content-infoItem'>
                <span className={styles.content}>Released: </span>
                <span className='movie-container_content-infoData'>{movie.Released}</span>
              </div>        
              <div className='movie-container_content-infoItem'>
                <span className={styles.content}>Actors: </span>
                <span className='movie-container_content-infoData'>{movie.Actors}</span>
              </div>
              <div className='movie-container_content-infoItem'>
                <span className='movie-container_content-infoTitle'>Language: </span>
                <span className='movie-container_content-infoData'>{movie.Language}</span>
              </div>
              <div className='movie-container_content-infoItem'>
                <span className={styles.content}>Country: </span>
                <span className='movie-container_content-infoData'>{movie.Country}</span>
              </div>
              <div className='movie-container_content-infoItem'>
                <span className={styles.content}>Rated: </span>
                <span className='movie-container_content-infoData'>{movie.Rated}</span>
              </div>
              <div className='movie-container_content-infoItem'>
                <span className={styles.content}>Awards: </span>
                <span className='movie-container_content-infoData'>{movie.Awards}</span>
              </div>
              <div className='movie-container_content-infoItem'>
                <span className={styles.content}>imdbRating: </span>
                <span className='movie-container_content-infoData'>{movie.imdbRating}</span>
              </div>
              <div className='movie-container_content-infoItem'>
                <span className={styles.content}>Type: </span>
                <span className='movie-container_content-infoData'>{movie.Type}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };