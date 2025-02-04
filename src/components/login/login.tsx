import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../services/slices/userSlice';
import styles from './login.module.css'
import { useNavigate } from 'react-router-dom';
import { isUserInUserList, loginUser } from '../../utils/auth';

export const Login = () => { 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const authenticate = (email: string, password: string) => {
    const user = isUserInUserList(email);
    if (user) {
      loginUser(email, password);
      dispatch(
        setUser({ isAuth: true, user: { ...user, password } }),
      );
      navigate('/');
      setMessage(`${email} Вы успешно авторизовались!`);
    } else {
      setMessage(`${email} такой пользователь не зарегистрирован!`);
    }
  }

  return (
    <div>
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        authenticate(credentials.email, credentials.password)
      }} 
      className={styles.form}
    >
      <div>
        <input 
          className={styles.loginInput}
          id="email" 
          type="email" 
          placeholder="Введите логин" 
          value={credentials.email} 
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
          required 
        />
      </div>
      <div>
        <input 
          className={styles.loginInput}
          id="password" 
          type="password" 
          placeholder="Введите пароль" 
          minLength={6} 
          value={credentials.password} 
          onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
          required 
        />
      </div>
      <button className={styles.loginButton} type="submit">
        Войти 
      </button> 
    </form>
    {message && <div className={styles.message}>{message}</div>} {/* Отображение сообщения */}
    </div>
  );
}

export default Login;