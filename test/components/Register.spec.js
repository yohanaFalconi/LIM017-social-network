/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
import { Register } from '../../src/components/Register.js';
import { checkPassword, checkEmail } from '../../src/main.js';
// import { createUserWithEmailAndPassword } from '../../src/lib/firebaseUtils.js';

jest.mock('../../src/lib/firebaseUtils.js');

beforeEach(() => {
  document.body.innerHTML = "<div id='root'></div>";
  Register();
});

describe('checkPassword', () => {
  it('should be a function', () => {
    expect(typeof checkPassword).toBe('function');
  });
  it('should return true for a string of lowercase letters', () => {
    expect(checkPassword('asdfghjkl')).toBe(true);
  });

  it('should return true for a string of uppercase letters', () => {
    expect(checkPassword('ASDFGHJKL')).toBe(true);
  });
  it('should return true for a string of numbers', () => {
    expect(checkPassword('123456789')).toBe(true);
  });
  it('should return false for a string shorter than 8 characters', () => {
    expect(checkPassword('1234567')).toBe(false);
  });
  it('should return false for a string longer than 15 characters', () => {
    expect(checkPassword('1234567890123456')).toBe(false);
  });
  it('should return false for a string containing special characters', () => {
    expect(checkPassword('asdfghjk!')).toBe(false);
  });
});

describe('checkEmail', () => {
  it('should be a function', () => {
    expect(typeof checkEmail).toBe('function');
  });
  it('should return true for "example@gmail.com"', () => {
    expect(checkEmail('example@gmail.com')).toBe(true);
  });
  it('should return true for "example_example@gmail.com"', () => {
    expect(checkEmail('example_example@gmail.com')).toBe(true);
  });
  it('should return true for "example-example@gmail.com"', () => {
    expect(checkEmail('example-example@gmail.com')).toBe(true);
  });
  it('should return true for "example.example@gmail.com"', () => {
    expect(checkEmail('example.example@gmail.com')).toBe(true);
  });

  it('should return false for "example.@gmail.com"', () => {
    expect(checkEmail('example.@gmail.com')).toBe(false);
  });
  it('should return false for "example"', () => {
    expect(checkEmail('example')).toBe(false);
  });
  it('should return false for "example@"', () => {
    expect(checkEmail('example@')).toBe(false);
  });
  it('should return false for "example@.com"', () => {
    expect(checkEmail('example@.com')).toBe(false);
  });
  it('should return true for "example@gmail.com.pe"', () => {
    expect(checkEmail('example@gmail.com.pe')).toBe(true);
  });
  it('should return true for "example@gmail.com."', () => {
    expect(checkEmail('example@gmail.com.')).toBe(false);
  });
});

/* it.only('devuelve a home', () => {
  document.body.innerHTML = '<div class="icon-arrow-left2"></div>';
  Register();
  const buttonLogin = document.querySelector('.icon-arrow-left2');
  buttonLogin.dispatchEvent(new Event('click'));
  expect(onNavigate()).toEqual(onNavigate('/'));
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
