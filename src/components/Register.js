/* eslint-disable import/no-cycle */

import { signUpEmail, verificationEmail, logInGoogle } from '../lib/firebase-auth.js';
import { onNavigate } from '../main.js';

export const Register = () => {
  const registerDiv = document.createElement('div');
  const containerRegister = `
    <div class="top">
      <i class="icon-arrow-left2">Back</i>
      <figure class="containerLogoLetters">
      <img src="Imagenes/Logotipo/Full-logo.png" alt="Binge Worthy logo" class="fullLogo">
      </figure>
    </div>
    <div id="containerRegister">
      <p class="darkPurple w6">Register with email</p>
      <div class="container">
        <form action="" method="POST" class="form">
          <div class="formGroup">
            <input type="email" name="email" id="userEmail" placeholder="email" class="formItem">
            <label for="email" class="formLabel">Email</label>
          </div>
          <div class="formGroup">
            <input type="password" name="password" id="password" placeholder="password" class="formItem">
            <label for="password" class="formLabel">Password</label>
          </div>
        </div>
          <button class="button" id="createAccBtn">Create account</button>
          <p id="progressMsg"></p>
        </form>
        <i class="icon-eye" id="eyeLogo1" ></i>
        <i class="icon-eye-blocked" id="eyeSlashLogo1" style="display: none;"></i>
      </div>
      <p>or register with</p>
      <div id="googleRegBtn">
        <img class="googleIcon" src="https://developers.google.com/identity/images/g-logo.png" alt="">
        <p class="buttonText w7">Google</p>
      </div>
      <div id="fbRegBtn">
        <img class="fbIcon" src="https://i0.wp.com/uncomocorreo.com/wp-content/uploads/2017/03/facebook-logo.png?resize=300%2C300&ssl=1" alt="">
        <p class="buttonText w7">Facebook</p>
      </div>
    </div>`;

  registerDiv.innerHTML = containerRegister;
  const createAccBtn = registerDiv.querySelector('#createAccBtn');
  const googleRegBtn = registerDiv.querySelector('#googleRegBtn');
  const email = registerDiv.querySelector('#userEmail');
  const password = registerDiv.querySelector('#password');
  const progressMsg = registerDiv.querySelector('#progressMsg');
  // const reenterPassword = registerDiv.querySelector('#reenterPassword');

  createAccBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signUpEmail(email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        progressMsg.innerText = 'Your account is being created, please wait';
        verificationEmail()
          .then(() => {
            onNavigate('/verifyEmail');
          });
      })
      .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
        console.log(error);
      });
  });

  googleRegBtn.addEventListener('click', () => {
    logInGoogle()
      .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
        console.log('google sign up', result);
      })
      .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });
  });

  return registerDiv;
};
