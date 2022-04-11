export const Register = () => {
  const LogInDivs = document.createElement('div');
  const containerFullLogo = `<figure class="top">
                            <i class="icon-arrow-left2">Back</i>
                            <img src="Imagenes/Logotipo/Full-logo.png" alt="Binge Worthy logo" class="fullLogo">
                            </figure>
                            <figure class="containerLogoLetters">`;
  const containerRegister = `
  <div id="containerRegister">
    <p class="darkPurple w6">Register with email</p>
    <div class="container">
    <form action="" method="POST" class="form">
      <div class="formGroup">
        <input type="email" name="email" id="userEmail" placeholder="email" class="formItem">
        <label for="email" class="formLabel">Email</label>
      </div>
      <div class="formGroup">
        <input type="password" name="password" id="password" placeholder="password" class="formItem">
        <label for="password" class="formLabel">Password</label>
      </div>
    </form>
    <i class="icon-eye" id="eyeLogo1" ></i>
    <i class="icon-eye-blocked" id="eyeSlashLogo1" style="display: none;"></i>
    </div>`;
  const registerBtnsWith = `<button class="button" id="createAccBtn">Create account</button>
                            <p>or register with</p>
                                <div id="googleRegBtn">
                                  <img class="googleIcon" src="https://developers.google.com/identity/images/g-logo.png" alt="">
                                  <p class="buttonText w7">Google</p>
                                </div>
                                <div id="fbRegBtn">
                                  <img class="fbIcon" src="https://i0.wp.com/uncomocorreo.com/wp-content/uploads/2017/03/facebook-logo.png?resize=300%2C300&ssl=1" alt="">
                                  <p class="buttonText w7">Facebook</p>
                                </div>`;

  LogInDivs.innerHTML = containerFullLogo;

  const createAccBtn = LogInDivs.querySelector('#createAccBtn');
  createAccBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('este boton debe funcionar', createAccBtn);
  });

  return LogInDivs;
};
