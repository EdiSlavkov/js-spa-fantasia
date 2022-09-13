for (let i = 0; i < data.length; i++) {
  let obj = data[i];
  productManager.add(obj.image, obj.name, obj.weight, obj.category, obj.price);
}

searchByText.addEventListener("input", function (e) {
  let text = e.target.value;
  let filter = productManager.filterByText(text);
  print(filter, results);
});

function print(products, container) {
  container.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    let obj = products[i];

    let contentCard = document.createElement("div");
    contentCard.classList.add("content-card");
    container.appendChild(contentCard);

    contentCard.innerHTML = `
            <img src="${obj.image}" width="200px" alt="product">
            <p>Продукт: ${obj.name}</p>
            <p>Грамаж: ${obj.weight} гр.</p>
            <p>Категория: ${obj.category}</p>
            <p>Цена: ${obj.price} лв</p>
            <div class="buttonWrapper">
                <input class="card-btn" type="number" placeholder="брой">
                <button class="card-btn" disabled ></button>
            </div>
        `;

    let btnCount = contentCard.lastElementChild.firstElementChild;
    let btnCard = contentCard.lastElementChild.lastElementChild;
    let basketCount = document.getElementById("basketCount");

    btnCount.addEventListener("input", function () {
      if (btnCount.value > 0) {
        btnCard.disabled = false;
        obj.number = btnCount.value;
      } else {
        btnCount.value = 1;
      }
    });

    if (user.ordered.indexOf(obj) === -1) {
      btnCard.innerHTML = "Add to cart";
      btnCard.addEventListener("click", function () {
        user.add(obj);
        basketCount.innerHTML = `${user.ordered.length}`;
        router.hashChange();
      });
    } else {
      btnCard.innerHTML = "Check your cart";
      btnCard.addEventListener("click", function () {
        if (user.ordered.length < 1) {
          basketCount.innerHTML = "";
        } else {
          basketCount.innerHTML = `${user.ordered.length}`;
        }
        router.hashChange();
      });
    }
  }
}
