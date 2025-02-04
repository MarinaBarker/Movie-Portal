import { useEffect } from 'react';
import styles from'./App.module.css';
import ErrorBoundary from '../../pages/error-boundary/error-boundary';
import { NotFound404 } from '../../pages/not-found-404/not-found-404';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import { useDispatch, useSelector } from '../../services/store';
import { MainPage } from '../../pages/main-page/main-page';
import { FavoriteMovie } from '../../pages/favorite-movie/favorite-movie';
import { Movie } from '../../pages/movie/movie';
import { Auth } from '../../pages/authorization/auth';
import { Profile } from '../../pages/profile/profile';
import { getCurrentUser, isUserInUserList } from '../../utils/auth';
import { setUser } from '../../services/slices/userSlice';

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const isUserInList = isUserInUserList(user.name);
      isUserInList &&
        dispatch(
          setUser({
            isAuth: true,
            user: { ...isUserInList, password: user.password },
          }),
        );
    }
  }, [dispatch]);

  return (
    <div className={styles.app}>
        <AppHeader />
        <Routes location={background}>
        <Route path='/' element={<MainPage />} />
        <Route path='/movie/:id' element={<ErrorBoundary><Movie /></ErrorBoundary>} />
        {isAuth && <Route path='/favorites' element={<FavoriteMovie />} /> }
        {!isAuth 
            ? <Route path='/login' element={<Auth />} />
            : <Route path='/profile' element={<Profile />} />
          }
        <Route path='*' element={<NotFound404 />} />
      </Routes>  
    </div>
  );
}

export default App;
