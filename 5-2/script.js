

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
    },
    generateCart() {
        this.container = document.querySelector('.cart');
        if (this.products.length) {
            this.container.innerHTML = `В корзине ${this.products.length} товаров(a) на сумму: ${this.cartPrice()}`;
        }
        else this.container.innerHTML = 'Корзина пуста';
    }
}

cart.generateCart();