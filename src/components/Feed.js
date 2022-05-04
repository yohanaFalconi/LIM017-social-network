/* eslint-disable max-len */
import {
  logOut, savePost, onGetPost, getPost, updatePost, getArrayLikes, postLike, auth,
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
          <option value="Movie">Movie</option>
          <option value="Book">Book</option>
          <option value="TV Show">TV Show</option>
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
      <h3>Are you sure to delete?</h3>
      <input type="button" id="cancelDelete" value="Cancel" class="button">
      <input type="button" id="confirmDelete" value="Delete" class="button">
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
  const description = feedDiv.querySelector('#postDescription');
  const post = feedDiv.querySelector('#postDescription');
  const postBtn = feedDiv.querySelector('#postBtn');
  const postForm = feedDiv.querySelector('#postForm');
  const postContainer = feedDiv.querySelector('#postContainer');
  // const op = feedDiv.querySelector('.originalPost');
  const tag = feedDiv.querySelector('#tag');
  // const postBody = feedDiv.querySelector('#postBody');

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

  const movieFilter = feedDiv.querySelector('#MovieFilter');
  const BookFilter = feedDiv.querySelector('#BookFilter');
  const tvShowFilter = feedDiv.querySelector('#tvShowFilter');
  const home = feedDiv.querySelector('#home');

  /*   function like(idP, likesP) {
    const btnLike = feedDiv.querySelector('.btnLike');
    const arrayLikes = likesP;
    let arrayLength = likesP.length;
    const userData = getUserLocalStorage();
    const counterLikes = feedDiv.querySelector('.counter-likes');
    if (arrayLikes === 0) {
      counterLikes.style.display = 'none';
    }
    if (arrayLikes.includes(userData.uid)) {
      btnLike.classList.add('icon-like-red');
    }
    // Si el ícono de like está de color rojo, quiere decir que el usuario si le gustaba el post
    if (btnLike.classList.contains('icon-like-red')) {
      btnLike.classList.toggle('icon-like-red'); // Hacemos que cambie de color al quitarle la clase.
      arrayLength -= 1;
      removeLikes(idP, userData.uid);
      // Llamamos a la función que se encarla de eliminar el id del user que ya no le gusta el post
      if (arrayLength === 0) {
        counterLikes.style.display = 'none';
      }
    } else {
      btnLike.classList.add('icon-like-red'); // Añadimos la clase para darle color rojo al corazón
      arrayLength += 1;
      counterLikes.style.display = 'block'; // Esto lo ponemos en caso, no haya tenido antes likes
      addLikes(idP, userData.uid);
    // Actualizamos el post, añadiendo el id del usuario que ha dado like al array 'Likes'.
    }
    // Cambiamos el valor del contador:
    counterLikes.innerText = arrayLength;
  }
  console.log('SOyyyy LIKEEEEEEE', like()); */

  function AddLikes(user) {
    const likeButton = feedDiv.querySelectorAll('.likeButton');
    likeButton.forEach((e) => {
      e.addEventListener('click', async () => {
        console.log('entreee al botón likeeeeeee');
        // eslint-disable-next-line prefer-const
        let arrayLikes = await getArrayLikes(e.id);
        let count = 0;
        const arrayCounter = arrayLikes.length;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < arrayLikes.length; i++) {
          if (arrayLikes[i] === user.uid) {
            arrayLikes.splice(i, 1);
            postLike(e.id, arrayLikes);
            break;
          } else {
            // eslint-disable-next-line no-plusplus
            count++;
          }
        }
        if (count === arrayCounter) {
          arrayLikes.push(user.uid);
          postLike(e.id, arrayLikes);
        }
      });
    });
  }

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
            <i class="icon-heart" id= "like"></i>
            <div>
            <button class="btnEdit" data-id=${doc.id}>Edit</button>
            </div>
            <input type="button" class="deleteBtns" value="Delete" data-id="${doc.id}" class="button">
          </div>
          `;
      });
      postContainer.innerHTML = posts;
      AddLikes(auth.currentUser);

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
          description.value = postDoc.post;
          tag.value = postDoc.tag;
          id = dataset.id;
        });
      });
    });
  };
  fetchPosts();
  console.log('soy feccccch', fetchPosts(), AddLikes());

  confirmDelete.addEventListener('click', () => {
    deletePost(deleteId)
      .then(() => {
        console.log('se eliminó tu post', deleteId);
        deleteDiv.classList.add('inactive');
        overlayDelete.classList.add('inactive');
        deleteDiv.classList.remove('active');
        overlayDelete.classList.remove('active');
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
      console.log('valor botonsito', postBtn.value);
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
          <p id="postBody">${postData.post}</p>
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
          <p id="postBody">${postData.post}</p>
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
          <p id="postBody">${postData.post}</p>
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

  return feedDiv;
};
