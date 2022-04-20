/* eslint-disable import/no-cycle */
import { recoverPasswordWithEmail } from '../lib/firebase-auth.js';
import { onNavigate } from '../main.js';

export const ResetPassword = () => {
  const resetPassDiv = document.createElement('div');
  const containerPassDiv = `
  <form>
    <div class="top">
        <figure class="containerLogoLetters">
            <img src="Imagenes/Logotipo/Full-logo.png" alt="Binge Worthy logo" class="fullLogo">
        </figure>
    </div>
    <h2>Do you have trouble logging in?</h2>
    <p>Enter your email and will <br>
    send you a link to log back <br>
    into your account</p>

    <form action="" method="POST" class="form">
        <div class="formGroup">
            <input type="email" name="email" id="userEmailPassReset" placeholder="email" class="formItem">
            <label class="formLabel" for="email">Email</label>
        </div>
        <input type="button" id="sendResetEmail" value="Send access link" class="button">
        <br>
        <p id="sendEmailMsg"></p>
        <br>
        <input type="button" id="backLogIn" value="Back to log in" class="button">
  </form>
    `;
  resetPassDiv.innerHTML = containerPassDiv;
  const email = resetPassDiv.querySelector('#userEmailPassReset');
  const sendResetEmail = resetPassDiv.querySelector('#sendResetEmail');
  const sendEmailMsg = resetPassDiv.querySelector('#sendEmailMsg');
  const backLogIn = resetPassDiv.querySelector('#backLogIn');
  sendResetEmail.addEventListener('click', () => {
    recoverPasswordWithEmail(email.value)
      .then(() => {
        sendEmailMsg.innerHTML = 'Password reset email sent,<br>please check you email';
        email.classList.add('valid');
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
        if (error.code === 'auth/missing-email') {
          sendEmailMsg.innerHTML = 'Enter your email';
          email.classList.add('invalid');
        } else if (error.code === 'auth/invalid-email') {
          sendEmailMsg.innerHTML = 'Invalid email';
          email.classList.add('invalid');
        } else if (error.code === 'auth/user-not-found') {
          sendEmailMsg.innerHTML = 'User not found';
          email.classList.add('invalid');
        }
      });
  });
  backLogIn.addEventListener('click', () => {
    onNavigate('/logIn');
  });
  return resetPassDiv;
};
