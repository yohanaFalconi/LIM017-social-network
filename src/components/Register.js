/* eslint-disable import/no-cycle */

import {
  signUpEmail, verificationEmail, logInGoogle, logInFacebook,
} from '../lib/firebase-auth.js';
import { onNavigate } from '../main.js';

export const Register = () => {
  const registerDiv = document.createElement('div');
  const containerRegister = `
  <main id="registerMain">
    <div class="top">
      <i class="icon-arrow-left2 darkPurple"></i>
      <figure class="containerTopLogo">
        <img src="Imagenes/Logotipo/Full-logo.png" alt="Binge Worthy logo" class="fullLogo">
      </figure>
    </div>
    <div id="containerRegister">
      <p class="purple w6 meow">Register with email</p>
      <div class="container">
        <form action="" method="POST" class="form">
          <div class="formGroup">
            <input type="email" name="email" id="userEmail" placeholder="email" class="formItem">
            <label for="email" class="formLabel emailLabel">Email</label>
          </div>
          <div class="formGroup passwordGroup">
            <div>
              <input type="password" name="password" id="password" placeholder="password" class="formItem">
              <label for="password" class="formLabel">Password</label>
            </div>
            <div>
              <i class="icon-eye darkPurple" id="eyeLogo1" style="display: none;"></i>
              <i class="icon-eye-blocked darkPurple" id="eyeSlashLogo1"></i>
            </div>
          </div>
          <p id="passMsg"></p>
        </form>
      </div>
      <button class="button" id="createAccBtn">Create account</button>
      <p id="progressMsg"></p>
      <br>
      <p class="purple">or</p>
      <div id="googleRegBtn" class="googleBtn">
        <img class="googleIcon" src="https://developers.google.com/identity/images/g-logo.png" alt="">
        <p class="buttonText w7">Continue with Google</p>
      </div>
      <div id="fbRegBtn" class="fbBtn">
        <img class="fbIcon" src="https://i0.wp.com/uncomocorreo.com/wp-content/uploads/2017/03/facebook-logo.png?resize=300%2C300&ssl=1" alt="">
        <p class="buttonText w7">Continue with Facebook</p>
      </div>
    </div>
  </main>`;

  registerDiv.innerHTML = containerRegister;

  const createAccBtn = registerDiv.querySelector('#createAccBtn');
  const googleRegBtn = registerDiv.querySelector('#googleRegBtn');
  const email = registerDiv.querySelector('#userEmail');
  const password = registerDiv.querySelector('#password');
  const progressMsg = registerDiv.querySelector('#progressMsg');
  const passMsg = registerDiv.querySelector('#passMsg');
  const passwordPattern = /^[\d\w@-]{8,15}$/i;
  password.addEventListener('keyup', () => {
    if (!passwordPattern.test(password.value)) {
      password.classList.add('invalid');
      password.classList.remove('valid');
      passMsg.innerHTML = `The password must at least have 
       <br> a minimum of 8 characters with <br> an uppercase letter,
       a lowercase <br>letter and number.`;
    } else if (passwordPattern.test(password.value)) {
      password.classList.add('valid');
      password.classList.remove('invalid');
      passMsg.innerText = '';
    }
  });
  const emailPattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  email.addEventListener('keyup', () => {
    if (!emailPattern.test(email.value)) {
      email.classList.add('invalid');
      email.classList.remove('valid');
    } else if (emailPattern.test(email.value)) {
      email.classList.add('valid');
      email.classList.remove('invalid');
    }
  });

  const eye = registerDiv.querySelector('#eyeLogo1');
  const eyeSlash = registerDiv.querySelector('#eyeSlashLogo1');
  eyeSlash.addEventListener('click', () => {
    if (password.type === 'password') {
      password.type = 'text';
      eyeSlash.style.display = 'none';
      eye.style.display = '';
      if (eyeSlash.style.display === 'none') {
        eye.addEventListener('click', () => {
          password.type = 'password';
          eyeSlash.style.display = '';
          eye.style.display = 'none';
        });
      }
    }
  });

  createAccBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (emailPattern.test(email.value) && passwordPattern.test(password.value)) {
      signUpEmail(email.value, password.value)
        .then((userCredential) => {
          // const user = userCredential.user;
          console.log(userCredential);
          progressMsg.innerText = 'Your account is being created, please wait';
          verificationEmail()
            .then(() => {
              onNavigate('/verifyEmail');
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error, errorCode, errorMessage);
        });
    } else {
      progressMsg.innerText = 'Wrong. Please, try again.';
    }
  });

  const backIcon = registerDiv.querySelector('.icon-arrow-left2');
  backIcon.addEventListener('click', () => {
    onNavigate('/');
  });

  googleRegBtn.addEventListener('click', () => {
    logInGoogle()
      .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
        console.log('google sign up', result);
        onNavigate('/feed');
      })
      .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });
  });

  const fbRegBtn = registerDiv.querySelector('#fbRegBtn');
  fbRegBtn.addEventListener('click', () => {
    logInFacebook()
      .then((result) => {
        // const user = result.user;
        console.log('facebook sign up', result);
        // const credential = FacebookAuthProvider.credentialFromResult(result);
        // const accessToken = credential.accessToken;
        onNavigate('/feed');
      })
      .catch((error) => {
        /* const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error); */
        console.log(error);
      });
  });

  return registerDiv;
};
