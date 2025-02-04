import { FC } from "react";
import styles from './filter.module.css'

type MoviesFilterProps = {
  setTypeParam: CallableFunction,
}

const Filter: FC<MoviesFilterProps> = ({ setTypeParam }) => {
  return(
    <section className={styles.container}>
      <label htmlFor="type">Сортировать по типу:</label>
      <select className={styles.types} onChange={e => setTypeParam(e.target.value)} name="type" id="type">
        <option value="">Все</option>
        <option value="movie">Фильмы</option>
        <option value="series">Сериалы</option>
        <option value="game">Игры</option>
      </select>
    </section>
  );
}

export default Filter