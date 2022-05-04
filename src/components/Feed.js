import {
  logOut, savePost, onGetPost, getPost, updatePost, deletePost, getDataWithFilters,
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
    <form id="postForm" class="modal" class="inactive">
      <div class="gridColum mtop">
        <p id="originalPost" class="purple originalPost"></p>
        <select class="select" id="tag">
          <option disabled selected >Type</option>
          <option value="Movie">Movie</option>
          <option value="Book">Book</option>
          <option value="TV Show">TV Show</option>
        </select>
      </div>
      <textarea id="postDescription" placeholder="Write your recommendation here"></textarea>
      <div class="post">
        <input type="submit" id="postBtn" value="Post" class="button">
        <input type="button" id="cancelBtn" value="Cancel" class="button">
      </div>
    </form>
    <div id="overlay" class="inactive"></div>

    <div id="deleteDiv" class="inactive modal">
      <h3>Are you sure to delete?</h3>
      <input type="button" id="cancelPopUpBtn" value="Cancel" class="button">
      <input type="button" id="yesDelete" value="Yes" class="button">
    </div>
    <div id="overlayDelete" class="inactive"></div>
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
  // const op = feedDiv.querySelector('.originalPost');
  const tag = feedDiv.querySelector('#tag');
  const openModalPost = feedDiv.querySelector('#uploadPost');
  const closeModalBtn = feedDiv.querySelector('#cancelBtn');
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
  function openModal() {
    postForm.classList.add('active');
    overlay.classList.add('active');
    postForm.classList.remove('inactive');
    overlay.classList.remove('inactive');
  }
  function closeModal() {
    postForm.classList.add('inactive');
    overlay.classList.add('inactive');
    postForm.classList.remove('active');
    overlay.classList.remove('active');
  }

  openModalPost.addEventListener('click', openModal);
  postBtn.addEventListener('click', closeModal);
  closeModalBtn.addEventListener('click', () => {
    closeModal();
    postForm.reset();
  });
  
  

  // Funciones de la ventana modal de delete
  const closePopUpBtn = feedDiv.querySelectorAll('#cancelPopUpBtn');
  const overlayModal = feedDiv.querySelector('#overlayDelete');
  const deleteDiv = feedDiv.querySelector('#deleteDiv');
  const yesDelete = feedDiv.querySelector('#yesDelete');
  let deleteId = '';

  const movieFilter = feedDiv.querySelector('#MovieFilter');
  const BookFilter = feedDiv.querySelector('#BookFilter');
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
            <p class="postBody">${postData.post}</p>
            <i class="icon-heart" id= "like"></i>
            <div>
            <button class="btnEdit" data-id=${doc.id}>Edit</button>
            </div>
            <input type="button" class="deleteBtns" value="Delete" data-id="${doc.id}" class="button">
          </div>
          `;
      });
      postContainer.innerHTML = posts;
      
      const deleteBtns = feedDiv.querySelectorAll('.deleteBtns');
      deleteBtns.forEach((btn) => {
        btn.addEventListener('click', ({ target: { dataset } }) => {
          deleteId = dataset.id;
          openModal();
        });
      });
      closePopUpBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          closeModal();
          });
       });

      const editBtns = feedDiv.querySelectorAll('.btnEdit');
      editBtns.forEach((btn) => {
        btn.addEventListener('click', async ({ target: { dataset } }) => {
          editStatus = true;
          changeToEditingStatus();
          openModal();
          const doc = await getPost(dataset.id);
          const post = doc.data();
          description.value = post.description;
          tag.value = post.tag;
          id = dataset.id;
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

  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!editStatus) {
      savePost(post, tag);
    } else {
      updatePost(id, {
        post: post.value,
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
          <input type="button" id="openPopUpBtn" value="Delete" data-id="${doc.id}" class="button">
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
          <input type="button" id="openPopUpBtn" value="Delete" data-id="${doc.id}" class="button">
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
          <input type="button" id="openPopUpBtn" value="Delete" data-id="${doc.id}" class="button">
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

  /*   const counterLikes = feedDiv.querySelector('.counter-likes');
  const userData = getUserLocalStorage();
  const arrayLikes = doc.data().Likes;
  const arrayLength = arrayLikes.length;
  const btnLike = feedDiv.querySelector('#like');

  if (doc.data().Likes.length === 0) {
    counterLikes.style.display = 'none';
  }
  if (arrayLikes.includes(userData.uid)) {
    btnLike.classList.add('icon-like-red');
  }
  btnLike.addEventListener('click', () => {

  }); */
  
  return feedDiv;
};
