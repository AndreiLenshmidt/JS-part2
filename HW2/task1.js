class Library {
  #books = [];
  constructor(...booksList) {
    if (booksList.length === new Set(booksList).size)
      this.#books.splice(0, 0, ...booksList);
    else throw new Error("Ошибка, список содержит дубликаты");
  }
  hasBook(title) {
    return this.#books.includes(title);
  }
  get allBooks() {
    return this.#books.toString();
  }

  addBook(title) {
    if (this.hasBook(title))
      throw new Error(`Kнига ${title} уже была добавлена раньше`);
    else this.#books.push(title);
    return this;
  }

  removeBook(title) {
    if (!this.hasBook(title))
      throw new Error(`Kниги ${title} нет в списке библиотеки`);
    else this.#books.splice(this.#books.indexOf(title), 1);
    return this;
  }
}

const library1 = new Library("First book", "Second book", "Third book");
library1.addBook("book 4").addBook("book 5").addBook("book 6");
// library1.addBook("First book"); // Должна быть ошибка
library1.removeBook("book 5").removeBook("book 4");
// library1.removeBook("book 4"); // Должна быть ошибка
console.log(library1.allBooks);
// const library2 = new Library("First book", "First book", "First book"); // Должна быть ошибка
