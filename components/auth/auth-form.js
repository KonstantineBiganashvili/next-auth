import { useRef, useState } from 'react';
import classes from './auth-form.module.css';

const createUser = async (email, password) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    throw new Error(data.message || 'Something Went Wrong!');
  }

  return user;
};

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (
      !enteredEmail ||
      !enteredEmail.includes('@') ||
      !enteredPassword ||
      !enteredPassword.trim()
    ) {
      return alert('Invalid Credentials');
    }

    if (isLogin) {
      //Login Code Will Go Here
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
