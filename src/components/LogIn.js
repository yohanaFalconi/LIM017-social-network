export const LogIn = () => {
  const LogInDivs = document.createElement('div');
  const containerFullLogo = `
  <div class="top">
    <i class="backIcon">Back</i>
    <figure class="containerLogoLetters">
      <img src="Imagenes/Logotipo/Full-logo.png" alt="Binge Worthy logo" class="fullLogo">
    </figure>
  </div>
  <div id="containerLogin">
    <p class="darkPurple w6">Log in with email</p>
    <div class="container">
      <form action="" method="POST" class="form">
        <div class="formGroup">
          <input type="email" name="email" id="userEmail" placeholder="email" class="formItem">
          <label for="email" class="formLabel">Email</label>
        </div>
        <div class="formGroup">
          <input type="password" name="password" id="password" placeholder="password" class="formItem">
          <label for="password" class="formLabel">Password</label>
          <i class="icon-eye" id="eyeLogo1" ></i>
          <i class="icon-eye-blocked" id="eyeSlashLogo1" style="display: none;"></i>
        </div>
      </form>
      <div id="aDiv">
        <button class="pink" id="forgotPass">I forgot my password</button>
        <button class="button" id="loginBtn">Log in</button>
      </div>
    </div>
    <p>or continue with</p>
    <div id="googleLoginBtn" class="googleBtn">
      <img class="googleIcon" src="https://developers.google.com/identity/images/g-logo.png" alt="">
      <p class="buttonText w7">Google</p>
    </div>
    <div id="fbLoginBtn" class="fbBtn">
      <img class="fbIcon" src="https://i0.wp.com/uncomocorreo.com/wp-content/uploads/2017/03/facebook-logo.png?resize=300%2C300&ssl=1" alt="">
      <p class="buttonText w7">Facebook</p>
    </div>
  </div>`;

  LogInDivs.innerHTML = containerFullLogo;
  return LogInDivs;
};
