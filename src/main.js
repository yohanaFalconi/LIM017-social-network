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
const root = document.getElementById('root');
root.appendChild(routes[window.location.pathname]());

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  return root.appendChild(routes[pathname]());
};
