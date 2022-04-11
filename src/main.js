// Este es el punto de entrada de tu aplicacion

// eslint-disable-next-line import/no-cycle
import { Home } from './components/Home.js';
import { Register } from './components/Register.js';
import { LogIn } from './components/LogIn.js';
// Router
// const pageOne = document.getElementById('welcome');

export const routes = {
  '/': Home,
  '/register': Register,
  '/logIn': LogIn,
};

// console.log(routes);
// const pageOne = document.getElementById('page-header');
const root = document.getElementById('root');
root.innerHTML = routes[window.location.pathname]();

export const onNavigate = (pathname) => {
  const pageView = document.getElementById('page-header');
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  pageView.innerHTML = routes[pathname]();
};
/* console.log(onNavigate); */

const registerPage = document.getElementById('signUpBtn');
registerPage.addEventListener('click', () => {
  onNavigate('/register');
  Register();
});

const pruebaBtnRegistro = document.getElementById('prueba');
console.log(pruebaBtnRegistro);
pruebaBtnRegistro.addEventListener('click', () => {
  console.log('holaaaa');
});

/* export function showRegister() {
  const registerButton = document.getElementById('registerButton');
  registerButton.addEventListener('click', () => {
    const email = document.getElementById('newUser').value;
    const password = document.getElementById('newUserPassword').value;
    const confirmPassword = document.getElementById('newUserPassword2').value;
    const displayName = document.getElementById('newUserDisplayName').value;
    if (password === confirmPassword) {
      Register(email, password, displayName);
    } else {
      alert('Las contraseñas deben ser iguales');
    }
  });
}
export function goToLogIn() {
  onNavigate('/register');
//  showLogIn();
} */

/* const newRegistry = document.getElementById('register');
newRegistry.addEventListener('click', () => {
  onNavigate('#/register');
  showRegister();
}); */

/*  const goToLogin = document.getElementById('goToLoginBtn');
goToLogin.addEventListener('click', () => onNavigate('/logIn')); */
