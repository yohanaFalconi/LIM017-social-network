import { onNavigate } from '../main.js';
import { 
    verifyUser,
} from '../lib/firebase-auth.js';
export const VerifyEmail = () => {
    const verifyDiv = document.createElement('div');
    const containerVerify = `
    <h1>Your account has been created, <br> please check you email to continue.</h1>
    <button class="button" id="verifyBtn">I verified my email</button>
    <p id="signUpMessage"></p>

    `;
    verifyDiv.innerHTML = containerVerify;

    const verifyBtn = verifyDiv.querySelector('#verifyBtn');
    const signUpMessage = verifyBtn.querySelector('#signUpMessage');

    verifyBtn.addEventListener('click', () => {
      /*const user = userCredential.user;  
      verifyUser()
        .then((user) => {
            const uid = user.uid;
            const email = user.email; 
            const emailVerified = user.emailVerified;
            
            if(!emailVerified){
              signUpMessage.textContent=`${email} Email no verificado`;
            }else{
              onNavigate('/logIn');
            }
        });*/
    });



    return verifyDiv;
}