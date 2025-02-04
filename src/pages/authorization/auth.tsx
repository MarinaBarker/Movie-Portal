import { lazy, Suspense, useState } from "react";
import { Preloader } from "../../components/preloader/preloader";
import styles from './auth.module.css'

const Login = lazy(() => import('../../components/login/login'));
const Register = lazy(() => import('../../components/register/register'));

export const Auth = () => { 
  const [authForm, setAuthForm] = useState(true);

  return (
    <section className={styles.container}> 
      <div className="auth">
        <button className={styles.button} onClick={() => setAuthForm(true)} aria-label="Вход">
          Вход
        </button>
        <span> / </span>
        <button className={styles.button} onClick={() => setAuthForm(false)} aria-label="Регистрация">
          Регистрация
        </button>
        <Suspense fallback={<div><Preloader/></div>}>
          {authForm
            ? <Login />
            : <Register />
          }
        </Suspense>
      </div>
    </section>
  );
}