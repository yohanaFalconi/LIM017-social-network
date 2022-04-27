import {
  logOut, savePost, onGetPost,
} from '../lib/firebaseAuth.js';
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const Feed = () => {
  const feedDiv = document.createElement('div');
  const containerFeed = `
    <header class= "navFeed">
      <figure class="top headerReset">
        <img src="images/logotype/Full-logo.png" alt="Binge Worthy logo" class="logoFeed">
        <img src="images/mobile/Mobile icon nav.png" class="nav">
      </figure>
    </header>
    <input type="button" id="logOut" value="Log out" class="button">
    <form id="postForm" class="modal" class="inactive">
      <div class="gridColum mtop">
        <p id="userName" class="purple">example@gmail.com</p>
        <select class="select">
          <option disabled selected >Type</option>
          <option value="movieSlted">Movie</option>
          <option value="bookSlted">Book</option>
          <option value="tvShowSlted">TvShow</option>
        </select>
      </div>
      <textarea id="postDescription" rows="2" placeholder="Write your recommendation here"></textarea>
      <div class="post">
        <input type="button" id="postBtn" value="Post" class="button">
        <input type="button" id="cancelBtn" value="Cancel" class="button">
      </div>
    </form>
    <div id="overlay" class="inactive"></div>
    <div id="postContainer"></div>
    <footer>
      <nav id= "footerMobile">
        <ul class="footerFeed darkPurple">
          <li class="icon-home"></li>
          <li class="icon-books"></li>
          <div><img src="images/mobile/upload post icon.png" id="uploadPost"> </div>
          <li class="icon-video-camera"></li>
          <li class="icon-man-woman"></li>
        </ul>
      </nav>
    </footer>
    `;
  feedDiv.innerHTML = containerFeed;

  const logOutBtn = feedDiv.querySelector('#logOut');
  const description = feedDiv.querySelector('#postDescription');
  const postBtn = feedDiv.querySelector('#postBtn');
  const postForm = feedDiv.querySelector('#postForm');
  const postContainer = feedDiv.querySelector('#postContainer');
  window.addEventListener('DOMContentLoaded', async () => {
    // querySnapshot : consulta Instantánea
    // const querySnapshot = await getPosts();
    onGetPost((querySnapshot) => {
      // console.log(querySnapshot); // objeto donde nos interesa los docs de tipo array
      let emptyPostContainer = '';
      querySnapshot.forEach((doc) => {
        // console.log(doc);
        // console.log(doc.data()); // data() transforma a un objeto de javascript
        // console.log(doc.id); //devuelve el id cada post
        // console.log(`${doc.id} => ${doc.data()}`);
        const postData = doc.data();
        emptyPostContainer += `
          <form id="postFormContainer" id="postForm">
            <div class="usersEmail">
              <p id="userName" class="darkPurple">example@gmail.com</p>
            </div>
            <p class="postBody">${postData.description}</p>
          </form>
          `;
      });
      postContainer.innerHTML = emptyPostContainer;
    });
  });
  postBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // vamos a guardar los post
    savePost(description.value);
    postForm.reset();
  });
  logOutBtn.addEventListener('click', () => {
    logOut()
      .then(() => {
        onNavigate('/');
      });
  });
  // Funciones de la ventana modal
  const openModalPost = feedDiv.querySelector('#uploadPost');
  const closeModalBtn = feedDiv.querySelector('#cancelBtn');
  const overlay = feedDiv.querySelector('#overlay');

  openModalPost.addEventListener('click', () => {
    postForm.classList.add('active');
    overlay.classList.add('active');
    postForm.classList.remove('inactive');
    overlay.classList.remove('inactive');
  });
  closeModalBtn.addEventListener('click', () => {
    postForm.classList.add('inactive');
    overlay.classList.add('inactive');
    postForm.classList.remove('active');
    overlay.classList.remove('active');
  });
  postBtn.addEventListener('click', () => {
    postForm.classList.add('inactive');
    overlay.classList.add('inactive');
    postForm.classList.remove('active');
    overlay.classList.remove('active');
  });

  return feedDiv;
};
