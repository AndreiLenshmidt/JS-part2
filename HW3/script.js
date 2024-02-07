// Сохраняет отзыв в локальное хранилище
const saveReview = (productName, userReview) => {
  let id;
  if (localStorage.getItem("currentId")) {
    id = localStorage.getItem("currentId");
  } else {
    localStorage.setItem("currentId", "0");
    id = localStorage.getItem("currentId");
  }
  localStorage.setItem(id.toString(), productName + ":" + userReview);
  localStorage.setItem("currentId", (++id).toString());
};

// Удаляет отзыв из локального хранилища
const deleteReview = (value) => {
  for (const key of Object.keys(localStorage)) {
    if (localStorage.getItem(key) === value) {
      localStorage.removeItem(key);
    }
  }
};

// Возвращает массив ключей локального хранилища
const readReviews = () => {
  const allUserReviews = [];
  for (const key of Object.keys(localStorage)) {
    if (key !== "currentId") allUserReviews.push(localStorage.getItem(key));
  }
  return allUserReviews;
};

// Загружает на страницу все отзывы сохраненные в хранилище
const allReviews = (allUserReviews, addInContainer = false) => {
  let id = 0;
  for (const rev of allUserReviews) {
    const product = rev.split(":")[0];
    const text = rev.split(":")[1];
    console.log(`Название прдукта: ${product}
    Отзыв: ${text}`);
    if (addInContainer) addReview(product, text, id++);
  }
};

// Добавляет отзыв на страницу
const addReview = (prdName, revText, id) => {
  document.querySelector(".reviewContainer").insertAdjacentHTML(
    "beforeend",
    `<div class="review${id} box">
          <p class="${prdName} prdName">Название продукта: ${prdName}</p>
          <p>Отзыв: ${revText}</p>
          <button class="delRev${id} del">Удалить отзыв</button>
      </div>`
  );

  document.querySelector(".productName").value = "";
  document.querySelector("#review").value = "";

  // На кнопку только что созданного отзыва вещается событие удаления отзыва
  document.querySelector(`.delRev${id}`).addEventListener("click", (event) => {
    const value =
      event.target.parentNode.children[0].outerText.slice(19) +
      ":" +
      event.target.parentNode.children[1].outerText.slice(7);
    deleteReview(value);
    event.target.parentNode.remove();
  });

  // На название товара вашается событие загружающее в консоль все отзывы на этот товар
  document.querySelector(`.${prdName}`).addEventListener("click", (event) => {
    for (const rev of readReviews()) {
      const product = rev.split(":")[0];
      const text = rev.split(":")[1];
      if (product === prdName)
        console.log(`Название прдукта: ${product}
            Отзыв: ${text}`);
    }
  });
};

// Событие создание отзыва, сохраняет отзыв на стр. и добавляет его в локальное хранилище
document.querySelector(".makeRev").addEventListener("click", () => {
  let id = localStorage.getItem("currentId");
  const prdName = document.querySelector(".productName").value;
  const revText = document.querySelector("#review").value;
  addReview(prdName, revText, id);
  saveReview(prdName, revText);
  localStorage.setItem("currentId", (++id).toString());
});

// Авто-загрузка отзывов из хранилища при перезагрузке страницы
allReviews(readReviews(), true);
