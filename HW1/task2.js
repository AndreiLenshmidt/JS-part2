function Cook(name, specialization) {
  this.name = name;
  this.specialization = specialization;
}

function Order(klientName, ...dishes) {
  this.klientName = klientName;
  this.dishesInOrder = dishes;
}

const Viktor = new Cook("Виктор", "Пицца");
const Olga = new Cook("Ольга", "Суши");
const Dmitri = new Cook("Дмитрий", "Десерты");

const restaurant = {
  dishes: new Map()
    .set("Маргарита", Viktor)
    .set("Пепперони", Viktor)
    .set("Филадельфия", Olga)
    .set("Калифорния", Olga)
    .set("Тирамису", Dmitri)
    .set("Чизкейк", Dmitri),
  orders: [],
  //   Поиск имени клиента по названию блюда
  searchKlient(dishName) {
    const clientOrder = this.orders.filter((order) => {
      for (const dish of order.dishesInOrder) {
        if (dish === dishName) return true;
      }
      return false;
    });
    const klientNames = clientOrder.map(
      (currentOrder) => currentOrder.klientName
    );
    return String(klientNames);
  },
  //   Добавить заказ
  addOrder(klientName, ...dishes) {
    this.orders.push(new Order(klientName, ...dishes));
    return this;
  },
  //   Показать информацию о приготовление заказа
  showCooker(dishName) {
    return `Повар ${
      this.dishes.get(dishName).name
    } готовит блюдо ${dishName} для клиента(-ов) ${this.searchKlient(
      dishName
    )}`;
  },
};

restaurant
  .addOrder("Алексей", "Пепперони", "Тирамису")
  .addOrder("Мария", "Калифорния", "Маргарита")
  .addOrder("Ирина", "Чизкейк");

console.log(restaurant.showCooker("Калифорния"));
console.log(restaurant.showCooker("Пепперони"));
