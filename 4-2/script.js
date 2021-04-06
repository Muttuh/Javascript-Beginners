// 2.Продолжить работу с интернет-магазином:
// 2.1. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
// 2.2. Реализуйте такие объекты.
// 2.3. Перенести функционал подсчета корзины на объектно-ориентированную базу.

const cart = {
    products: [
        {
            articleNumber: 456873,
            productName: 'футболка',
            quantity: 2,
            price: 1345
        },
        {
            articleNumber: 284623,
            productName: 'кроссовки',
            quantity: 1,
            price: 6799
        },
        {
            articleNumber: 278342,
            productName: 'куртка',
            quantity: 1,
            price: 15000
        },
        {
            articleNumber: 981423,
            productName: 'шапка',
            quantity: 1,
            price: 1999
        }
    ],

    cartPrice() {
        return this.products.reduce((finalPrice, cartProduct) => finalPrice + cartProduct.quantity * cartProduct.price, 0);
    }
}

console.log(cart.cartPrice(cart)); 