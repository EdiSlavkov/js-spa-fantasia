window.addEventListener("hashchange", router.hashChange);
window.addEventListener("load", router.hashChange);
window.addEventListener("load", function(){
    if(userManager.logIn.length > 0){
      isSignIn = true;
      location.hash = "#menu";
      router.hashChange()
      let name = userManager.logIn[0].username;
      loginInfo.innerHTML = `Добре дошъл, ${name}!`;
      logOut.innerHTML = `изход`;
    }
  })