import { FC } from "react";
import styles from './not-found-404.module.css';
import error from '../../images/error.svg';

export const NotFound404: FC = () => (
  <div className={styles.container}>
    <img className={''} src={error} width={'400px'} height={'400px'}></img>
    <h3 className={`pb-6 text text_type_main-large`}>
      Страница не найдена. Ошибка 404.
    </h3>
  </div>
  );
  