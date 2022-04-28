/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
import { Register } from '../../src/components/Register.js';
import { checkEmail, checkPassword } from '../../src/main.js';

jest.mock('../../src/lib/firebaseUtils.js');
jest.mock('../../src/components/Feed.js');

beforeEach(() => {
  document.body.innerHTML = "<div id='root'></div>";
  Register();
});

describe('Ingreso con cuentas externas a la App', () => {
  it('Registra usuario de Google, ingresa, y lo lleva al Feed', (done) => {
    const registerDiv = Register();
    const buttonLoginGoogle = registerDiv.querySelector('#googleRegBtn');
    buttonLoginGoogle.dispatchEvent(new Event('click'));
    setTimeout(() => {
      expect(window.location.pathname).toBe('/feed');
      done();
    });
  });

  it('Registra usuario de Facebook, ingresa, y lo lleva al Feed', (done) => {
    const registerDiv = Register();
    const buttonLoginFacebook = registerDiv.querySelector('#fbRegBtn');
    buttonLoginFacebook.dispatchEvent(new Event('click'));
    setTimeout(() => {
      expect(window.location.pathname).toBe('/feed');
      done();
    });
  });
});

describe('Flecha de atrás', () => {
  it('Devuelve a la página anterior', () => {
    const registerDiv = Register();
    const buttonLogin = registerDiv.querySelector('.icon-arrow-left2');
    buttonLogin.dispatchEvent(new Event('click'));
    expect(window.location.pathname).toBe('/');
  });
});

describe('Validación de email mientras el usuario ingresa el texto', () => {
  it('El correo está bien escrito, el input es verde, ósea válido', () => {
    const registerDiv = Register();
    const email = registerDiv.querySelector('#userEmail');
    email.value = 'front@end.la';
    const result = checkEmail(email.value);
    email.dispatchEvent(new Event('keyup'));
    expect(result).toBe(true);
  });
});

it('El correo está mal escrito, el input es rojo ósea, inválido', () => {
  const registerDiv = Register();
  const email = registerDiv.querySelector('#userEmail');
  email.value = 'frontend.la';
  const result = checkEmail(email.value);
  email.dispatchEvent(new Event('keyup'));
  expect(result).toBe(false);
});

describe('Validación de contraseña mientras el usuario ingresa el texto', () => {
  it('La contraseña está bien escrita, el input es verde ósea válido', () => {
    const registerDiv = Register();
    const password = registerDiv.querySelector('#password');
    password.value = '12345678';
    const result = checkPassword(password.value);
    password.dispatchEvent(new Event('keyup'));
    expect(result).toBe(true);
  });
});

it('La contraseña está mal escrita, el input es rojo ósea inválido', () => {
  const registerDiv = Register();
  const password = registerDiv.querySelector('#password');
  password.value = '12345';
  const result = checkPassword(password.value);
  password.dispatchEvent(new Event('keyup'));
  expect(result).toBe(false);
});

describe('Mostar y ocultar contraseña', () => {
  it('Icono que muestra la contraseña', () => {
    const registerDiv = Register();
    const eyeSlash = registerDiv.querySelector('#eyeSlashLogo1');
    const password = registerDiv.querySelector('#password');
    password.type = 'password';
    eyeSlash.style.display = '';
    eyeSlash.dispatchEvent(new Event('click'));
    expect(password.type).toBe('text');
    expect(eyeSlash.style.display).toBe('none');
  });
});

it('Icono que oculta la contraseña', () => {
  const registerDiv = Register();
  const eye = registerDiv.querySelector('#eyeLogo1');
  const eyeSlash = registerDiv.querySelector('#eyeSlashLogo1');
  const password = registerDiv.querySelector('#password');
  eyeSlash.style.display = 'none';
  eye.style.display = '';
  password.type = 'text';
  if (eyeSlash.style.display === 'none') { eye.dispatchEvent(new Event('click')); }

  console.log(eye.dispatchEvent(new Event('click')));
  expect(password.type).toBe('password');
  console.log(password.type);
  expect(eyeSlash.style.display).toBe('');
  expect(eye.style.display).toBe('none');
});

/* describe('Verifica y concede permisos de entrada', () => {
  it('Correo y contraseña correctos para enviar a página de verificación', (done) => {
    const registerDiv = Register();
    const buttonLoginGoogle = registerDiv.querySelector('createAccBtn');
    buttonLoginGoogle.dispatchEvent(new Event('click'));
    email.value = 'frontend.la';
    password.value = '12345678'
    const result = checkEmail(email.value) && checkPassword(password.value);
    setTimeout(() => {
      expect(window.location.pathname).toBe('/verifyEmail');
      done();
    });
  }); */

/* it.skip('Regex correo', () => {
  document.body.innerHTML = '<div id="userEmail"></div>';
  Register();
  const emailPattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  const inputEmail = document.getElementById('userEmail');
  inputEmail.value = 'front@la.com';
  inputEmail.classList.add('valid');
  inputEmail.dispatchEvent(new Event('keyup'));
  const result = !emailPattern.test(inputEmail.value);

  expect(result.classList).toBe('invalid');
}); */

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
});

// RegisterUser
/* it.skip('Debería devolder el correo de registro', () => registerUser('front@end.la', '123456', 'fullname')
  .then((userCredential) => {
    expect('front@end.la').toBe(userCredential.user.email);
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(createUserWithEmailAndPassword.mock.calls[0]).toEqual([{ languageCode: 'es' }, 'front@end.la', '123456']);
  })); */
