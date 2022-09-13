let router = (function () {
  class Router {
    hashChange() {
      let hash = window.location.hash.slice(1);

      switch (hash) {
        case "loginPage":
          sumAndButton.style.visibility = "hidden";
          registrationPage.style.display = "none";
          menu.style.display = "none";
          basket.style.display = "none";
          delivery.style.display = "none";
          loginPage.style.display = "flex";
          break;

        case "registrationPage":
          sumAndButton.style.visibility = "hidden";
          loginPage.style.display = "none";
          registrationPage.style.display = "flex";
          menu.style.display = "none";
          basket.style.display = "none";
          delivery.style.display = "none";
          break;

        case "menu":
          sumAndButton.style.visibility = "hidden";
          loginPage.style.display = "none";
          registrationPage.style.display = "none";
          basket.style.display = "none";
          delivery.style.display = "none";
          if (isSignIn) {
            menu.style.display = "flex";
            print(productManager.products, results);
          } else {
            menu.style.display = "none";
            loginPage.style.display = "flex";
          }
          break;

        case "basket":
          menu.style.display = "none";
          loginPage.style.display = "none";
          registrationPage.style.display = "none";
          delivery.style.display = "none";
          total.style.display = "block";
          if (isSignIn) {
            basket.style.display = "flex";
            printHistory();
          } else {
            basket.style.display = "none";
            loginPage.style.display = "flex";
          }
          if (user.ordered.length < 1) {
            sumAndButton.style.visibility = "hidden";
            basket.innerHTML = `
                        <h2>Нямате продукти в количката!</h2>
                        `;
          } else {
            sumAndButton.style.visibility = "visible";
            printBasket(user.ordered, basket);
          }

          break;

        case "delivery":
          sumAndButton.style.visibility = "hidden";
          loginPage.style.display = "none";
          registrationPage.style.display = "none";
          menu.style.display = "none";
          basket.style.display = "none";
          if (isSignIn) {
            delivery.style.display = "block";
            print(productManager.products, results);
          } else {
            delivery.style.display = "none";
            loginPage.style.display = "flex";
          }
          break;

        default:
          sumAndButton.style.visibility = "hidden";
          loginPage.style.display = "flex";
          registrationPage.style.display = "none";
          menu.style.display = "none";
          basket.style.display = "none";
          delivery.style.display = "none";
          break;
      }
    }
  }
  return new Router();
})();
