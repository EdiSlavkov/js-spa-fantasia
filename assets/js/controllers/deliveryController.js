


deliveryForm.addEventListener("input", function (e) {
  e.preventDefault();
  if (
    profileName.value.trim() !== "" &&
    profileName.value.length < 20 &&
    phone.value.trim() !== "" &&
    adress.value.trim() !== "" &&
    adress.value.length < 70 &&
    phone.value.length === 10
  ) {
    finalizationBtn.disabled = false;
    finalizationBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      let order = user.ordered.reduce((acc, e) => {
        acc.date = `${
          new Date().toLocaleDateString() +
          " " +
          new Date().toLocaleTimeString()
        }`;
        acc.adress = adress.value;
        acc.product += `${e.name} ${e.number}бр `;
        acc.sum += parseFloat(e.price * e.number);
        return acc;
      }, (acc = { date: 0, adress: "", product: "", sum: 0 }));
      userManager.addHistory(order);
      let message = document.getElementById("systemMessage");
      message.innerHTML =
        "Поръчката е приета! Благодарим, че избрахте дюнери Фантазия!";
      deliveryForm.style.display = "none";
      setTimeout(() => {
        deliveryForm.reset();
        location.hash = "basket";
        deliveryForm.style.display = "flex";
        message.innerHTML = "";
      }, 2000);
    });
  } else {
    finalizationBtn.disabled = true;
  }
});

function printBasket(ordered, container) {
  container.innerHTML = "";
  let counter = 1;
  let totalSum = 0;

  for (let i = 0; i < ordered.length; i++) {
    let obj = ordered[i];
    let orderedCard = document.createElement("div");
    orderedCard.classList.add("ordered-card");
    container.appendChild(orderedCard);
    totalSum += obj.price * obj.number;
    orderedCard.innerHTML = `
              <span>${counter++}.  </span>
              <span>   ${obj.name}   </span>
              <span> ${obj.number}бр * ${obj.price}лв. = ${parseFloat(
      obj.number * obj.price
    ).toFixed(2)}лв.! Промени количеството:</span>
              <input type="number" class="productPcs" value="${obj.number}">
              <button id="basketRemove" class="card-btn">X</button>
          `;

    let basketRemove = orderedCard.lastElementChild;

    let productPcs = document.getElementsByClassName("productPcs");
    let orderedArr = Array.from(productPcs);
    orderedArr.forEach((elem) => {
      elem.addEventListener("input", function (e) {
        e.stopImmediatePropagation();

        if (e.target.value >= 1) {
          obj.number = e.target.value;
          setTimeout(() => {
            printBasket(user.ordered, basket);
          }, 500);
        } else {
          obj.number = 1;
          printBasket(user.ordered, basket);
        }
      });
    });

    basketRemove.addEventListener("click", function () {
      user.remove(obj);
      if (user.ordered.length < 1) {
        basketCount.innerHTML = "";
      } else {
        basketCount.innerHTML = `${user.ordered.length}`;
      }
      router.hashChange();
    });
  }
  total.innerHTML = `Обща сума: ${parseFloat(totalSum).toFixed(2)} лв.!`;
}

function printHistory() {
  let userHistory = userManager.getHistory();
  let errorNoHistory = document.getElementById("errorNoHistory");

  if (userHistory.length < 1) {
    errorNoHistory.style.display = "block";
    errorNoHistory.innerHTML = "ВСЕ ОЩЕ НЯМАТЕ НАПРАВЕНА ПОРЪЧКА!";
    document.getElementById("tableHistory").style.display = "none";
  } else {
    document.getElementById("tableHistory").style.display = "block";
    errorNoHistory.innerHTML = "";
    errorNoHistory.style.display = "none";
    orderDate.innerHTML = "Дата";
    orderAdress.innerHTML = "Адрес";
    orderProducts.innerHTML = "Продукти";
    totalAmount.innerHTML = "Сума";

    userHistory.forEach((e) => {
      let date = document.createElement("p");
      let destination = document.createElement("p");
      let products = document.createElement("p");
      let total = document.createElement("p");
      date.innerHTML = `${e.date}`;
      destination.innerHTML = `${e.adress}`;
      products.innerHTML = `${e.product}`;
      total.innerHTML = `${parseFloat(e.sum).toFixed(2)} лв.`;
      orderDate.append(date);
      orderAdress.append(destination);
      orderProducts.append(products);
      totalAmount.append(total);
    });
  }
}
