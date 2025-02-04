import { FC } from "react";
import { Preloader } from "../../components/preloader/preloader";
import styles from './favorite-movie.module.css'
import { useSelector } from "../../services/store";
import { useGetFavoritesByIdQuery } from "../../utils/api";
import MovieCard from "../../components/movie-card/movie-card";

export const FavoriteMovie = () => {
  const { user } = useSelector((state) => state.user);
  const favorites = user && user?.favorites.length ? user?.favorites : [];
  const {data, isLoading} = useGetFavoritesByIdQuery({ids:  favorites})

  if (isLoading) return <Preloader />
  if (favorites.length < 1) return <span className={styles.empty}>Здесь будут отображаться ваши любимые фильмы, когда вы их добавите.</span>

  return (
    <>
      <div className={styles.containerMain}>
        {data?.map((favorite) => (
          <MovieCard
          key={favorite.imdbID}
          movie={favorite} />
        ))}
      </div>
    </>
  )
}