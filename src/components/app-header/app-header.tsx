import { FC } from "react";
import styles from './app-header.module.css';
import Logo from '../../images/logo.svg';
import { Link} from "react-router-dom";
import { AccountCircle, FavoriteBorder } from "@mui/icons-material";
import { useSelector } from "../../services/store";

export const AppHeader: FC = () => {
  const login = useSelector((state: any) => state.user.user?.name);
  const isAuth = useSelector((state: any) => state.user.isAuth); // Проверяем авторизацию

return (

  <header className={styles.header}>
  <nav className={`${styles.menu} p-4`}>
    <div className={styles.menu_part_left}>
      <>
        <Link to={isAuth ? '/favorites' : '/login'} className={styles.link}>
          <FavoriteBorder type={'primary'} />
          <p className='text text_type_main-default ml-2'>Избранное</p>
        </Link>
      </>
    </div>
    <div className={styles.logo}>
      <Link to='/' className={styles.link}>
        <img src={Logo} className='' width={'400px'} height={'100px'}/>
      </Link>
    </div>
    <div className={styles.link_position_last}>
      <Link to={isAuth ? '/profile' : '/login'} className={styles.link}>
        <AccountCircle type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            {isAuth ? login : 'Личный кабинет'}
          </p>
      </Link>
    </div>
  </nav>
</header>
)
};