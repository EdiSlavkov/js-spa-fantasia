let isSignIn = false;

logOut.addEventListener("click", function () {
  userManager.userLogOut();
  isSignIn = false;
  user.ordered = [];
  location.hash = "";
  loginInfo.innerHTML = "";
  logOut.innerHTML = "";
  basketCount.innerHTML = "";
});

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let emailValue = loginUserEmail.value.trim();
  let passValue = loginUserPass.value.trim();

  if (userManager.checkLoginValue(emailValue, passValue)) {
    isSignIn = true;
    userManager.userLogIn(emailValue);
    location.hash = "#menu";
    router.hashChange();
    let name = userManager.getUserName(emailValue);
    loginInfo.innerHTML = `Добре дошъл, ${name}!`;
    logOut.innerHTML = `изход`;
    userManager.userLogIn(emailValue);
  } else {
    loginError.style.display = "block";
    isSignIn = false;
  }

  this.reset();
});
