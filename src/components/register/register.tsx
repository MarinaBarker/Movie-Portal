import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.css'
import { useDispatch } from '../../services/store';
import { setUser } from '../../services/slices/userSlice';
import { isUserInUserList, regInUserList } from '../../utils/auth';

export const Register = () => { 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const registerUser = (email: string, password: string, confirmPassword: string) => {
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password, confirmPassword);

    if (!isValidEmail || !isValidPassword) return;
    dispatch(setUser({ isAuth: true, user: { name: email, password, favorites: [] } }));
    regInUserList(email, password);
    navigate('/');
    setMessage(`${email} Вы успешно зарегистрировались!`);
  };

  const validateEmail = (email: string) => {
    if (isUserInUserList(email)) {
      setMessage(`${email} такой e-mail уже существует.`);
      return false;
    }
    return true;
  };

  const validatePassword = (pass1: string, pass2: string) => {
    if (pass1 !== pass2) {
      setMessage('Введите одинаковые пароли!');
      return false;
    }
    return true;
  }
  return (
    <div>
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        registerUser(credentials.email, credentials.password, credentials.confirmPassword)
      }} 
      className={styles.form}
    >
      <div>
        <input 
          className={styles.registerInput}
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
          className={styles.registerInput}
          id="password" 
          type="password" 
          placeholder="Введите пароль" 
          minLength={6} 
          value={credentials.password} 
          onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
          required 
        />
      </div>
      <div>
        <input 
          className={styles.registerInput}
          id="confirnPassword" 
          type="password" 
          placeholder="Повторите пароль"
          minLength={6}
          value={credentials.confirmPassword}
          onChange={(e) => setCredentials({...credentials, confirmPassword: e.target.value})}
          required 
        />
      </div>
      <button className={styles.registerButton} type="submit">
        Зарегистрироваться 
      </button> 
    </form>
    {message && <div className={styles.message}>{message}</div>} {/* Отображение сообщения */}
    </div>
  );
}

export default Register;