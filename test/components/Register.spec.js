/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
import { Register } from '../../src/components/Register.js';
import { onNavigate } from '../../src/main.js';
// import { createUserWithEmailAndPassword } from '../../src/lib/firebaseUtils.js';

jest.mock('../../src/lib/firebaseUtils.js');

beforeEach(() => {
  document.body.innerHTML = "<div id='root'></div>";
  Register();
});

/* it.only('devuelve a home', () => {
  document.body.innerHTML = '<div class="icon-arrow-left2"></div>';
  Register();
  const buttonLogin = document.querySelector('.icon-arrow-left2');
  buttonLogin.dispatchEvent(new Event('click'));
  expect(onNavigate()).toEqual(onNavigate('/'));
}); */

it('Regex correo', () => {
  document.body.innerHTML = '<div id="userEmail"></div>';
  Register();
  const emailPattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  const inputEmail = document.getElementById('userEmail');
  inputEmail.value = 'front@la.com';
  inputEmail.classList.add('valid');
  inputEmail.dispatchEvent(new Event('keyup'));
  const result = !emailPattern.test(inputEmail.value);

  expect(result.classList).toBe('invalid');
});

/* describe('al enviar el formulario', () => {
  it('valida los valores del formulario', (done) => {
    const email = 'front@end.la';
    const password = '123456El';
    validatorFormSignin.mockReturnValueOnce({ count: 1 });
    document.getElementById('input-email').value = email;
    document.getElementById('input-password').value = password;
    document.getElementById('input-confirm-password').value = confirmPassword;

    // TODO: como probr cosas asincronas
    document.querySelector('form').dispatchEvent(new Event('submit'));

    expect(validatorFormSignin).toHaveBeenCalledTimes(1);
    expect(validatorFormSignin).toHaveBeenCalledWith(email, password, confirmPassword);
    done();
  });
}); */

/* it('should call the sign-up with Google function', () => {
  const googleBtn = document.querySelector('#googleRegBtn');
  googleBtn.dispatchEvent(new Event('click'));
  logInGoogle();

  expect(window.location.pathname).toBe('/feed');
}); */
/*
describe('Registar un usuario', () => {
  beforeEach(() => createUserWithEmailAndPassword.mockClear());
  it('debería ser una función', () => {
    window.document.body.innerHTML = "<div id='root'></div>";
    Register();
  createUser('hola@gmail.com', '123456', 'angelica');
    expect(createUserWithEmailAndPassword.mock.calls[0]).toEqual(['front@end.la', '123456']);
  });
}); */

// RegisterUser
/* it.skip('Debería devolder el correo de registro', () => registerUser('front@end.la', '123456', 'fullname')
  .then((userCredential) => {
    expect('front@end.la').toBe(userCredential.user.email);
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(createUserWithEmailAndPassword.mock.calls[0]).toEqual([{ languageCode: 'es' }, 'front@end.la', '123456']);
  })); */
