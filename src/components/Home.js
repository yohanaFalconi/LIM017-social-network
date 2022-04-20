/* eslint-disable import/no-cycle */
import { onNavigate } from '../main.js';

export const Home = () => {
  const homeDivs = document.createElement('div');
  const containerLogo = `
    <figure class= "containerLogo">
      <img src="Imagenes/Logotipo/Logo-icon.png" alt="Binge Worthy logo" class="topLogo">
    </figure>
    <figure class="containerLogoLetters">
      <img src="Imagenes/Logotipo/Logo-letters-only.png" alt="Binge Worthy logo" class="appName">
      <p class="pink w7">MATCH WITH YOUR STORIES</p>
    </figure>
    <button id="signUpBtn" class="button">Create an account</button>
    <div id="goToLogin">
      <p>Already have an account?</p>
      <a id="goToLoginBtn" class="pink w5 link">Log in</a>
    </div>`;

  homeDivs.innerHTML = containerLogo;
  const createAccBtn = homeDivs.querySelector('#signUpBtn');
  createAccBtn.addEventListener('click', () => onNavigate('/register'));

  const goToLogin = homeDivs.querySelector('#goToLoginBtn');
  goToLogin.addEventListener('click', () => onNavigate('/logIn'));

  return homeDivs;
};
