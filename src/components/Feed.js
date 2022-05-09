/* eslint-disable max-len */
import {
  updatePost, getPost, /* auth, */
  logOut, savePost, onGetPost,
  deletePost, getDataWithFilters,
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
        <input type="button" id="logOut" value="Log out" class="button">
      </figure>
    </header>

    <form id="postForm" class="modal inactive">
      <div class="gridColum mtop">
        <p id="originalPost" class="purple originalPost"></p>
        <select class="select" id="tag">
          <option disabled selected >Type</option>
          <option value="movie">Movie</option>
          <option value="book">Book</option>
          <option value="tv Show">TV Show</option>
        </select>
      </div>
      <textarea id="postDescription" placeholder="Write your recommendation here"></textarea>
      <div class="post">
        <input type="submit" id="postBtn" value="Post" class="button">
        <input type="button" id="cancelUpload" value="Cancel" class="button">
      </div>
    </form>

    <div id="overlay" class="inactive"></div>
    <div id="deleteDiv" class="inactive modal">
      <h3 class="margin purple" >Are you sure to delete?</h3>
      <div class="flexDlt">
        <input type="button" id="cancelDelete" value="Cancel" class="button">
        <input type="button" id="confirmDelete" value="Delete" class="button">
      </div>
    </div>
    <div id="overlayDelete" class="inactive"></div>

    <div id="postContainer"></div>

    <footer>
      <nav id= "footerMobile">
        <ul class="footerFeed darkPurple">
          <li class="icon-home" id="home"></li>
          <li class="icon-books" id="bookFilter"></li>
          <div><img src="images/mobile/upload post icon.png" id="uploadPost"> </div>
          <li class="icon-video-camera" id="movieFilter"></li>
          <li class="icon-man-woman" id="tvShowFilter"></li>
        </ul>
      </nav>
    </footer>
    `;
  feedDiv.innerHTML = containerFeed;

  const logOutBtn = feedDiv.querySelector('#logOut');
  const postDescription = feedDiv.querySelector('#postDescription');
  const postBtn = feedDiv.querySelector('#postBtn');
  const postForm = feedDiv.querySelector('#postForm');
  const postContainer = feedDiv.querySelector('#postContainer');
  const tag = feedDiv.querySelector('#tag');

  const openModalPost = feedDiv.querySelector('#uploadPost');
  const closeModalBtn = feedDiv.querySelector('#cancelUpload');
  const overlay = feedDiv.querySelector('#overlay');
  let id = '';
  let editStatus = false;
  function changeToEditingStatus() {
    postBtn.value = 'Update';
  }
  function changeToPostingStatus() {
    postBtn.value = 'Post';
  }

  // Funciones de la ventana modal
  function openPostModal() {
    postForm.classList.add('active');
    overlay.classList.add('active');
    postForm.classList.remove('inactive');
    overlay.classList.remove('inactive');
  }
  function closePostModal() {
    postForm.classList.add('inactive');
    overlay.classList.add('inactive');
    postForm.classList.remove('active');
    overlay.classList.remove('active');
  }

  openModalPost.addEventListener('click', openPostModal);
  postBtn.addEventListener('click', closePostModal);
  closeModalBtn.addEventListener('click', () => {
    closePostModal();
    postForm.reset();
    changeToPostingStatus();
  });
  // Funciones de la ventana modal de delete
  const cancelDelete = feedDiv.querySelectorAll('#cancelDelete');
  const overlayDelete = feedDiv.querySelector('#overlayDelete');
  const deleteDiv = feedDiv.querySelector('#deleteDiv');
  const confirmDelete = feedDiv.querySelector('#confirmDelete');
  let deleteId = '';

  function openDeleteModal() {
    deleteDiv.classList.add('active');
    overlayDelete.classList.add('active');
    deleteDiv.classList.remove('inactive');
    overlayDelete.classList.remove('inactive');
  }
  function closeDeleteModal() {
    deleteDiv.classList.add('inactive');
    overlayDelete.classList.add('inactive');
    deleteDiv.classList.remove('active');
    overlayDelete.classList.remove('active');
  }

  const movieFilter = feedDiv.querySelector('#movieFilter');
  const BookFilter = feedDiv.querySelector('#bookFilter');
  const tvShowFilter = feedDiv.querySelector('#tvShowFilter');
  const home = feedDiv.querySelector('#home');

  const fetchPosts = () => {
    onGetPost((querySnapshot) => {
      let posts = '';
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        posts += `
          <div id="postFormContainer" id="postForm">
            <div class="usersEmail">
              <p id="userName" class="darkPurple">example@gmail.com</p>
              <p id="tagSelected">${postData.tag}</p>
            </div>
            <p id="postBody">${postData.post}</p>
            <i class="icon-heart likeButton" id></i>
            <div>
            <button class="btnEdit" data-id=${doc.id}>Edit</button>
            </div>
            <input type="button" class="deleteBtns" value="Delete" data-id="${doc.id}">
          </div>
          `;
        postContainer.innerHTML = posts;

        const btnLike = feedDiv.querySelectorAll('.likeButton');
        btnLike.forEach((btn) => {
          btn.addEventListener('click', () => {
            if (btn.classList.contains('icon-like-red')) {
              btn.classList.remove('icon-like-red');
            } else {
              btn.classList.add('icon-like-red');
            }
          });
        });
      });

      const deleteBtns = feedDiv.querySelectorAll('.deleteBtns');
      deleteBtns.forEach((btn) => {
        btn.addEventListener('click', ({ target: { dataset } }) => {
          deleteId = dataset.id;
          openDeleteModal();
        });
      });
      cancelDelete.forEach((btn) => {
        btn.addEventListener('click', () => {
          closeDeleteModal();
        });
      });

      const editBtns = feedDiv.querySelectorAll('.btnEdit');
      editBtns.forEach((btn) => {
        btn.addEventListener('click', async ({ target: { dataset } }) => {
          editStatus = true;
          changeToEditingStatus();
          openPostModal();
          const doc = await getPost(dataset.id);
          const postDoc = doc.data();
          postDescription.value = postDoc.post;
          tag.value = postDoc.tag;
          id = dataset.id;
        });
      });
    });
  };
  fetchPosts();

  confirmDelete.addEventListener('click', () => {
    deletePost(deleteId)
      .then(() => {
        deleteDiv.classList.add('inactive');
        overlayDelete.classList.add('inactive');
        deleteDiv.classList.remove('active');
        overlayDelete.classList.remove('active');
      });
  });

  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!editStatus) {
      savePost(postDescription, tag);
    } else {
      updatePost(id, {
        post: postDescription.value,
        tag: tag.value,
      });
      changeToPostingStatus();
      editStatus = false;
    }
    postForm.reset();
  });

  logOutBtn.addEventListener('click', () => {
    logOut()
      .then(() => {
        onNavigate('/');
      });
  });

  // Filtro tag según: movie, book, tvShow
  movieFilter.addEventListener('click', () => {
    getDataWithFilters('movie', (query) => {
      query.forEach((doc) => {
        // const postDoc = doc.data();
        const postDocument = doc.data();
        console.log(postDocument);
      });
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
