const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: "1",
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: "2",
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: "3",
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: "4",
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

let lastId = 4;

const searchProduct = function (productName, reviewsList) {
  const names = reviewsList.map((item) => item.product);
  const index = names.indexOf(productName);
  if (index >= 0) return reviewsList[index];
  else return false;
};

const addReviewIninitialData = function (reviewsList, productName) {
  const userReview = document.querySelector("#commentText").value;
  const comment = searchProduct(productName, reviewsList);
  if (comment) {
    comment.reviews.push({ id: String(++lastId), text: userReview });
    return comment;
  } else {
    const comment = {
      product: productName,
      reviews: [{ id: String(++lastId), text: userReview }],
    };
    reviewsList.push(comment);
    return comment;
  }
};

const addReviewInDocument = function (position, ...reviewsList) {
  if (position) {
    const elem = document.createElement("p");
    elem.classList.add("text");
    elem.textContent =
      reviewsList[0].reviews[reviewsList[0].reviews.length - 1].text;
    document.querySelector(".container").append(elem);
    return;
  }
  const reviewContainer = document.querySelector(".container");
  for (const product of reviewsList) {
    const elem = document.createElement("p");
    elem.classList.add("product");
    elem.textContent = product.product;
    reviewContainer.append(elem);
    for (const userReview of product.reviews) {
      const elem = document.createElement("p");
      elem.classList.add("text");
      elem.textContent = userReview.text;
      reviewContainer.append(elem);
    }
  }
};

const checkCommentTextLength = function (text, min, max) {
  return text.length > min && text.length < max ? true : false;
};

addReviewInDocument(false, ...initialData);

document.querySelector("#addReview").addEventListener("click", () => {
  if (
    !checkCommentTextLength(
      document.querySelector("#commentText").value,
      50,
      500
    )
  ) {
    document.querySelector("#commentText").value = "";
    document.querySelector("#commentText").placeholder = "Invalid comment";
    throw new Error("Invalid comment");
  }
  const comment = addReviewIninitialData(initialData, "Sony PlayStation 5");
  addReviewInDocument(true, comment);
  document.querySelector("#commentText").value = "";
});
