import {
  logOut, savePost, onGetPost, getPost, updatePost,
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
        <p id="originalPost" class="purple originalPost"></p>
        <select class="select" id="tag">
          <option disabled selected >Type</option>
          <option value="Movie">Movie</option>
          <option value="Book">Book</option>
          <option value="TV Show">TV Show</option>
        </select>
      </div>
      <textarea id="postDescription" rows="2" placeholder="Write your recommendation here"></textarea>
      <div class="post">
        <input type="submit" id="postBtn" value="Post" class="button">
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

  const fetchPosts = () => {
    onGetPost((querySnapshot) => {
      // console.log(querySnapshot); // objeto donde nos interesa los docs de tipo array
      let emptyPostContainer = '';
      querySnapshot.forEach((doc) => {
        // console.log(doc);
        // console.log(doc.data()); // data() transforma a un objeto de javascript
        const postData = doc.data();
        emptyPostContainer += `
          <div id="postFormContainer" id="postForm">
            <div class="usersEmail">
              <p>op</p>
              <p>${postData.tag}</p>
            </div>
            <p class="postBody">${postData.description}</p>
            <i class="icon-heart" id= "like"></i>
            <div>
              <button class="btnEdit" data-id=${doc.id}>Edit</button>
            </div>
          </div>
        `;
      });

      postContainer.innerHTML = emptyPostContainer;
      const editBtns = feedDiv.querySelectorAll('.btnEdit');
      // console.log(editBtns);
      editBtns.forEach((btn) => {
        btn.addEventListener('click', async ({ target: { dataset } }) => {
          editStatus = true;
          changeToEditingStatus();
          openModal();
          console.log(dataset.id);
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

  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!editStatus) {
      savePost(description.value, tag.value);
    } else {
      updatePost(id, {
        description: description.value,
        tag: tag.value,
      });
      changeToPostingStatus();
      editStatus = false;
    }
    /* .then((docRef) => {
        console.log('Se guardo publicacion en la db con el id: ', docRef.id);
      })
      .catch((error) => {
        console.log('Error adding document: ', error);
      }); */
    postForm.reset();
  });

  logOutBtn.addEventListener('click', () => {
    logOut()
      .then(() => {
        onNavigate('/');
      });
  });

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
