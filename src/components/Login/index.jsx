import React from 'react';
import { Button } from '@material-ui/core'
import { auth, provider } from '../../firebase';
import './styles.css';
import logo from '../../assets/klipartz.com.png'

function Login() {

  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  }

  return (
    <div className="login">
      <div className="login__logo">
        <img src={logo} alt="Logo" />
      </div>

      <Button onClick={signIn}>Sign In</Button>
    </div>
  )
}

export default Login;
