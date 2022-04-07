export const LogIn = () => {
  const containerFullLogo = `<figure class="top">
                            <i class="icon-arrow-left2">Back</i>
                            <img src="Imagenes/Logotipo/Full-logo.png" alt="Binge Worthy logo" class="fullLogo">
                            </figure>`;
  const containerLogIn = `<form action="" method="POST" class="form">
                          <p id="titleLogIn" class="pink">To get started, enter your phone or email</p>
                          <div class="formGroup">
                            <input type="email" name="email" id="userEmailLogIn" class="inputBox">
                            <label for="email">email</label>
                          </div>
                          <div class="formGroup">
                            <input type="password" name="password" id="passwordLogIn" class="inputBox">
                            <label for="password">password</label>
                            <i class="icon-eye" id="eyeLogo1" ></i>
                            <i class="icon-eye-blocked" id="eyeSlashLogo1" style="display: none;"></i>
                          </div>
                          </form>`;
  const forgotPassword = `<div id="aDiv">
                          <button class="pink" id="forgotPass">I forgot my password</button>
                          <input type="button" value="Log in" class="button">
                          </div>`;

  const LogInDivs = containerFullLogo + containerLogIn + forgotPassword;
  return LogInDivs;
};
