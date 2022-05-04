import {
  auth, logOut, savePost, onGetPost, deletePost, getDataWithFilters, getUser,
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
        <select class="select" id="tag">
          <option disabled selected >Type</option>
          <option value="movie">Movie</option>
          <option value="book">Book</option>
          <option value="tvShow">TvShow</option>
        </select>
      </div>
      <textarea id="postDescription" placeholder="Write your recommendation here"></textarea>
      <div class="post">
        <input type="button" id="postBtn" value="Post" class="button">
        <input type="button" id="cancelBtn" value="Cancel" class="button">
      </div>
    </form>
    <div id="overlay" class="inactive"></div>

    <div id="deleteDiv" class="inactive modalDlt">
      <h3 class="margin purple">Are you sure to delete?</h3>
      <div class="flexDlt">
        <input type="button" id="cancelPopUpBtn" value="Cancel" class="button">
        <input type="button" id="yesDelete" value="Yes" class="button">
      </div>
    </div>
    <div id="overlay" class="inactive"></div>
    <div id="postContainer"></div>

    <footer>
      <nav id= "footerMobile">
        <ul class="footerFeed darkPurple">
          <li class="icon-home" id="home"></li>
          <li class="icon-books" id="BookFilter"></li>
          <div><img src="images/mobile/upload post icon.png" id="uploadPost"> </div>
          <li class="icon-video-camera" id="MovieFilter"></li>
          <li class="icon-man-woman" id="tvShowFilter"></li>
        </ul>
      </nav>
    </footer>
    `;
  feedDiv.innerHTML = containerFeed;

  const logOutBtn = feedDiv.querySelector('#logOut');
  const post = feedDiv.querySelector('#postDescription');
  const postBtn = feedDiv.querySelector('#postBtn');
  const postForm = feedDiv.querySelector('#postForm');
  const postContainer = feedDiv.querySelector('#postContainer');
  const tag = feedDiv.querySelector('#tag');
  // Funciones de la ventana modal de delete
  const closePopUpBtn = feedDiv.querySelectorAll('#cancelPopUpBtn');
  const overlayModal = feedDiv.querySelector('#overlay');
  const deleteDiv = feedDiv.querySelector('#deleteDiv');
  const yesDelete = feedDiv.querySelector('#yesDelete');
  let deleteId = '';

  const movieFilter = feedDiv.querySelector('#MovieFilter');
  const BookFilter = feedDiv.querySelector('#BookFilter');
  const tvShowFilter = feedDiv.querySelector('#tvShowFilter');
  const home = feedDiv.querySelector('#home');

  const user = auth.currentUser; // Contiene toda la info del usuario
  console.log(user);
  console.log(user.displayName);
  console.log(user.email);
  const userInfo = () => {
    getUser(user.uid)
      .then((re) => {
        console.log(re);
      })
      .catch((err) => err);
  };
  userInfo();
  const fetchPosts = () => {
    onGetPost((querySnapshot) => {
      // console.log(querySnapshot); // objeto donde nos interesa los docs de tipo array
      let posts = '';
      querySnapshot.forEach((doc) => {
        // console.log(doc);
        // console.log(doc.id);
        // console.log(doc.data()); // data() transforma a un objeto de javascript
        const postData = doc.data();
        posts += `
          <div id="postFormContainer" id="postForm">
            <div class="usersEmail">
              <p id="userName" class="darkPurple">example@gmail.com</p>
              <p id="tagSelected">${postData.tag}</p>
            </div>
            <p class="postBody">${postData.post}</p>
            <input type="button" class="button deleteBtns" value="Delete" data-id="${doc.id}">
          </div>
          `;
      });
      postContainer.innerHTML = posts;
      const deleteBtns = feedDiv.querySelectorAll('.deleteBtns');
      deleteBtns.forEach((btn) => {
        btn.addEventListener('click', ({ target: { dataset } }) => {
          deleteId = dataset.id;
          deleteDiv.classList.add('active');
          overlayModal.classList.add('active');
          deleteDiv.classList.remove('inactive');
          overlayModal.classList.remove('inactive');
        });
      });
      closePopUpBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          deleteDiv.classList.add('inactive');
          overlayModal.classList.add('inactive');
          deleteDiv.classList.remove('active');
          overlayModal.classList.remove('active');
        });
      });
    });
  };
  fetchPosts();
  yesDelete.addEventListener('click', () => {
    deletePost(deleteId)
      .then(() => {
        console.log('se eliminó tu post', deleteId);
        deleteDiv.classList.add('inactive');
        overlayModal.classList.add('inactive');
        deleteDiv.classList.remove('active');
        overlayModal.classList.remove('active');
      });
  });

  postBtn.addEventListener('click', (e) => {
    e.preventDefault();
    savePost(user.uid, post, tag)
      .then((docRef) => {
        console.log('Se guardo publicacion en la db con el id: ', docRef.id);
      })
      .catch((error) => {
        console.log('Error adding document: ', error);
      });
    postForm.reset();
  });
  logOutBtn.addEventListener('click', () => {
    logOut()
      .then(() => {
        onNavigate('/');
      });
  });

  // Funciones de la ventana modal de post
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

  // Filtro tag según: movie, book, tvShow
  movieFilter.addEventListener('click', () => {
    getDataWithFilters('movie', (querySnapshot) => {
      let posts = '';
      postContainer.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        posts += `
        <div id="postFormContainer" id="postForm">
          <div class="usersEmail">
            <p id="userName" class="darkPurple">example@gmail.com</p>
            <p id="tagSelected">${postData.tag}</p>
          </div>
          <p class="postBody">${postData.post}</p>
        </div>
        `;
      });
      postContainer.innerHTML = posts;
    });
  });
  BookFilter.addEventListener('click', () => {
    getDataWithFilters('book', (querySnapshot) => {
      let posts = '';
      postContainer.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        posts += `
        <div id="postFormContainer" id="postForm">
          <div class="usersEmail">
            <p id="userName" class="darkPurple">example@gmail.com</p>
            <p id="tagSelected">${postData.tag}</p>
          </div>
          <p class="postBody">${postData.post}</p>
        </div>
        `;
      });
      postContainer.innerHTML = posts;
    });
  });
  tvShowFilter.addEventListener('click', () => {
    getDataWithFilters('tvShow', (querySnapshot) => {
      let posts = '';
      postContainer.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        posts += `
        <div id="postFormContainer" id="postForm">
          <div class="usersEmail">
            <p id="userName" class="darkPurple">example@gmail.com</p>
            <p id="tagSelected">${postData.tag}</p>
          </div>
          <p class="postBody">${postData.post}</p>
        </div>
        `;
      });
      postContainer.innerHTML = posts;
    });
  });
  // home recarga la pantalla
  home.addEventListener('click', () => {
    onNavigate('/feed');
  });

  return feedDiv;
};
