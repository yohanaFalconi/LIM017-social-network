/* eslint-disable max-len */
import {
  logOut, savePost, onGetPost, getPost, updatePost, getArrayLikes, postLike, auth,
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
              <p>op</p>
              <p>${postData.tag}</p>
            </div>
            <p class="postBody">${postData.description}</p>
            <i class="icon-heart likeButton"></i>
            <div>
              <button class="btnEdit" data-id=${doc.id}>Edit</button>
            </div>
          </div>
        `;
      });
      postContainer.innerHTML = posts;
      AddLikes(auth.currentUser);

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
  console.log('soy feccccch', fetchPosts(), AddLikes());

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

  return feedDiv;
};
