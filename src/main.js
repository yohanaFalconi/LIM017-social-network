/* eslint-disable import/no-cycle */
// Este es el punto de entrada de tu aplicacion

// eslint-disable-next-line import/no-cycle
import { Home } from './components/Home.js';
import { Register } from './components/Register.js';
import { LogIn } from './components/LogIn.js';
import { VerifyEmail } from './components/VerifyEmail.js';
import { Feed } from './components/Feed.js';
import { ResetPassword } from './components/ResetPassword.js';

// Router
export const routes = {
  '/': Home,
  '/register': Register,
  '/logIn': LogIn,
  '/verifyEmail': VerifyEmail,
  '/feed': Feed,
  '/resetPassword': ResetPassword,
};

/* const observatorIt = () => {
  window.addEventListener('DOMContentLoaded', () => {
    observatorIt();
    console.log('okay');
  });
  console.log('afuera del evento');
  return observatorIt;
};
console.log(observatorIt); */

export const onNavigate = (pathname) => {
  const root = document.getElementById('root');
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  } return root.appendChild(routes[pathname]());
};

window.addEventListener('DOMContentLoaded', () => {
  const pathname = window.location.pathname;
  // window.addEventListener('popstate', () => {});
  // const querystring = window.location.search;
  // const params = new URLSearchParams(querystring);
  onNavigate(pathname);
});
