/* import { ResetPassword } from '../../src/components/ResetPassword.js';
import { recoverPasswordWithEmail } from '../../src/lib/firebaseAuth.js';

jest.mock('../../src/lib/firebaseUtils.js');

beforeEach(() => {
  document.body.innerHTML = "<div id='root'></div>";
  ResetPassword();
});

describe('Rutas de navegación', () => {
  it('Volver a LogIn', () => {
    const resetPassDiv = ResetPassword();
    const backLogIn = resetPassDiv.querySelector('#backLogIn');
    backLogIn.dispatchEvent(new Event('click'));
    expect(window.location.pathname).toBe('/logIn');
  });

  it('Ir a Registro', () => {
    const resetPassDiv = ResetPassword();
    const backLogIn = resetPassDiv.querySelector('#goToRegisterBtn');
    backLogIn.dispatchEvent(new Event('click'));
    expect(window.location.pathname).toBe('/register');
  });
});

/* describe('Envía email de recuperación de contraseña', () => {
  it('Presiona botón para enviar email', (done) => {
    // jest.setTimeout();
    const resetPassDiv = ResetPassword();
    const sendResetEmail = resetPassDiv.querySelector('#sendResetEmail');
    const email = resetPassDiv.querySelector('#userEmailPassReset');
    email.value = 'front@end.la';
    sendResetEmail.dispatchEvent(new Event('click'));
    // recoverPasswordWithEmail(email.value);
    const result = resetPassDiv.querySelector('#sendEmailMsg');
    result.innerHTML = 'Password reset email sent,<br>please check you email';
    expect(result.innerHTML).toEqual('Password reset email sent,<br>please check you email');
    done();
  });
}); */
