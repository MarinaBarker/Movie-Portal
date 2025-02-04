import { FC } from "react";
import like from '../../images/like.svg';
import styles from './button-like.module.css'

type ButtonLikeProps = {
    onClick:() => void,
    active: boolean
  }
  
export const ButtonLike: FC<ButtonLikeProps> = ({ onClick, active }) => {
  
    return (
      <>
        {!active 
          ? <button className={styles.container} onClick={onClick}>
              <img className={styles.star} src={like} alt='Добавить в избранные' />{' '} 
              Добавить в избранные{' '}
            </button>
          : <button className={styles.container} onClick={onClick}>
              <img className={styles.star} src={like} alt='Удалить из избранных' />{' '}
              Удалить из избранных{' '}
            </button>
        }
      </>
    );
  };