// importamos la funcion que vamos a testear
/* import { onNavigate } from '../src/main.js';

describe('onNavigate', () => {
  it('debería ser una función', () => {
    expect(typeof onNavigate).toBe('function');
  });
}); */

// eslint-disable-next-line import/named
import { checkPassword, checkEmail/* , validateEmail */ } from '../src/components/Register.js';

jest.mock('../../src/lib/firebaseUtils.js');

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

/* describe('validateEmail', () => {
  it('should display an error message if the value of valid email is false', () => {
    document.body.innerHTML = `
    <input type="email" name="email">
    <p id="passMsg"></p>
    `;

    const emailInput = document.getElementById('email');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todolist = document.getElementById('todoList');

    emailInput.value = 'New todolist!';
    addTodoBtn.click();

    expect(todolist.innerHTML).toBe('<li>New todolist!</li>');
  });
}); */
/* test('Check that an error message is displayed if the value of valid email is false', () => {
  document.body.innerHTML = `
    <input type="email" name="email" id="userEmail" placeholder="email" class="formItem">
    <p id="passMsg"></p>
  `;
  require('../src/components/Register.js');

  const newTodoInput = document.getElementById('newTodoInput');
  const addTodoBtn = document.getElementById('addTodoBtn');
  const todolist = document.getElementById('todoList');

  newTodoInput.value = 'New todolist!';
  addTodoBtn.click();

  expect(todolist.innerHTML).toBe('<li>New todolist!</li>');
}); */
