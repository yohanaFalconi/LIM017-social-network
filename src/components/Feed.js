import { logOut } from '../lib/firebase-auth.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const Feed = () => {
  const feedDiv = document.createElement('div');
  const containerFeed = `
    <figure class="top">
        <i class="icon-arrow-left2">Back</i>
        <img src="Imagenes/Logotipo/Full-logo.png" alt="Binge Worthy logo" class="fullLogo">
    </figure>
    <input type="button" id="logOut" value="Log out" class="button">
    `;
  feedDiv.innerHTML = containerFeed;

  const logOutBtn = feedDiv.querySelector('#logOut');

  logOutBtn.addEventListener('click', () => {
    logOut()
      .then(() => {
        onNavigate('/');
      });
  });

  return feedDiv;
};
