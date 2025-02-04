import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "../../services/store";
import { clearCurrentUser } from "../../utils/auth";
import { logout } from "../../services/slices/userSlice";
import styles from './profile.module.css';
import photo from '../../images/default-photo.png';

export const Profile = () => { 
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const { user } = useSelector((state) => state.user);
  
    const onClickLogout = () => {
      clearCurrentUser();
      dispatch(logout());
      navigate('/')
    }
  
    return (
      <section className={styles.container}> 
        <div className="auth profile">
          <img  
            className={styles.photo}      
            src={photo}
            alt="Profile"
            width="150"
            height="150"
          />
          <p>
            Ваш e-mail: {user?.name}
          </p>
          <button 
            className={styles.button} 
            onClick={onClickLogout}
          >
            Выйти 
          </button> 
        </div>
      </section>
    );
  }