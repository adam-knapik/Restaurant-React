import React from 'react';
import './login.scss';

function Login() {

  return (
    <section className='login'>
      <h1 className='login__title'>Login</h1>
        <form className='login__form'>
          <input type="text" placeholder="Login" className='login__form__login' required />
          <input type="password" placeholder="Hasło" className='login__form__password' required />
          <button type="submit" className='login__form__button'>Zaloguj</button>
        </form>
    </section>
  )
}

export default Login;