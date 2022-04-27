import { logOut } from '../lib/firebaseAuth.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const Feed = () => {
  const feedDiv = document.createElement('div');
  const containerFeed = `
    <header class= "navFeed">
    <figure class="top">
        <img src="images/logotype/Full-logo.png" alt="Binge Worthy logo" class="logoFeed">
        <img src="images/mobile/Mobile icon nav.png" class="nav">
    </figure>
    </header>
    <input type="button" id="logOut" value="Log out" class="button">

    <footer>
    <nav id= "footerMobile">
    <ul class="footerFeed darkPurple">
    <li class="icon-home"></li>
    <li class="icon-books"></li>
    <figure> <img src="images/mobile/upload post icon.png" id="uploadPost"> </figure>
    <li class="icon-video-camera"></li>
    <li class="icon-man-woman"></li>
    </ul></nav>
    </footer>
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
