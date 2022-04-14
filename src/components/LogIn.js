/* eslint-disable import/no-cycle */
import {
  logInEmail,
  logInGoogle,
} from '../lib/firebase-auth.js';
// eslint-disable-next-line import/newline-after-import
import { onNavigate } from '../main.js';
export const LogIn = () => {
  const logInDiv = document.createElement('div');
  const containerLogIn = `
  <figure class="top">
    <i class="backIcon">Back</i>
    <img src="Imagenes/Logotipo/Full-logo.png" alt="Binge Worthy logo" class="fullLogo">
  </figure>
  <p id="titleLogIn" class="pink">To get started, enter your phone or email</p>
  <form action="" method="POST" class="form">
    <div class="formGroup">
      <input type="email" name="email" id="userEmailLogIn" class="inputBox">
      <label for="email">email</label>
    </div>
    <div class="formGroup">
      <input type="password" name="password" id="passwordLogIn" class="inputBox">
      <label for="password">password</label>
      <i class="icon-eye" id="eyeLogo1" ></i>
      <i class="icon-eye-blocked" id="eyeSlashLogo1" style="display: none;"></i>
    </div>
    <input type="button" id="logInBtn" value="Log in" class="button">
    <p id="logInMessage"></p>
    <br>
    <br>
    <p>or register with</p>
    <div id="googleRegBtn">
      <img class="googleIcon" src="https://developers.google.com/identity/images/g-logo.png" alt="">
      <p class="buttonText w7">Google</p>
    </div>
    <div id="fbRegBtn">
      <img class="fbIcon" src="https://i0.wp.com/uncomocorreo.com/wp-content/uploads/2017/03/facebook-logo.png?resize=300%2C300&ssl=1" alt="">
      <p class="buttonText w7">Facebook</p>
    </div>
  </form>
  <br>
  <br>
  <div id="aDiv">
    <button class="pink" id="forgotPass">I forgot my password</button>
  </div>`;
  logInDiv.innerHTML = containerLogIn;
  const logInBtn = logInDiv.querySelector('#logInBtn');
  const logInMessage = logInDiv.querySelector('#logInMessage');
  const googleRegBtn = logInDiv.querySelector('#googleRegBtn');
  logInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = logInDiv.querySelector('#userEmailLogIn');
    const password = logInDiv.querySelector('#passwordLogIn');
    logInEmail(email.value, password.value)
      .then(() => {
      // const user = userCredential.user;
        logInMessage.innerHTML = 'The user logged in';
        onNavigate('/feed');
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if (error.code === 'auth/wrong-password') {
          logInMessage.innerHTML = 'Wrong password. Try again';
        } else if (error.code === 'auth/user-not-found') {
          logInMessage.innerHTML = 'User not found';
        } else {
          logInMessage.innerHTML = `${error.code}`;
        }
      });
  });
  googleRegBtn.addEventListener('click', () => {
    logInGoogle()
      .then(() => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
        console.log('google sign up');
      })
      .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });
  });

  const backIcon = logInDiv.querySelector('.backIcon');
  backIcon.addEventListener('click', () => {
    onNavigate('/');
  });

  return logInDiv;
};
