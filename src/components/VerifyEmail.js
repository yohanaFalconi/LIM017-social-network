/* eslint-disable import/no-cycle */
import { onNavigate } from '../main.js';
import { userState } from '../lib/firebase-auth.js';

export const VerifyEmail = () => {
  const verifyDiv = document.createElement('div');
  const containerVerify = `
  <h3>Your account has been created, <br> please check you email to continue.</h3>
  <button class="button" id="verifyBtn">I verified my email</button>
  <p id="signUpMessage"></p>
  `;
  verifyDiv.innerHTML = containerVerify;

  const verifyBtn = verifyDiv.querySelector('#verifyBtn');
  const signUpMessage = verifyDiv.querySelector('#signUpMessage');

  verifyBtn.addEventListener('click', () => {
    userState((user) => {
      if (user) {
        // const uid = user.uid;
        // const email = user.email;
        const emailVerified = user.emailVerified;
        if (emailVerified === true) {
          signUpMessage.textContent = `${user.email} Email verificado`;
          onNavigate('/logIn');
        } else if (emailVerified === false) {
          signUpMessage.textContent = `${user.email} Email no verificado`;
          location.reload();
        } else {
          signUpMessage.textContent = 'Error :p';
        }
      }
    });
  });
  return verifyDiv;
};
