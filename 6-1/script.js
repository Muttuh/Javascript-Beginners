//КАТАЛОГ

const catalog = {
    catalogBlock: null,
    cart: null,
    products: [
        {
            articleNumber: 456873,
            productName: 'футболка',
            price: 1345
        },
        {
            articleNumber: 284623,
            productName: 'кроссовки',
            price: 6799
        },
        {
            articleNumber: 278342,
            productName: 'куртка',
            price: 15000
        },
        {
            articleNumber: 981423,
            productName: 'шапка',
            price: 1999
        }
    ],

    init(catalogBlockClass, cart) {
      this.catalogBlock = document.querySelector(`.${catalogBlockClass}`);
      this.cart = cart;
      this.generateCatalog();
      this.addEventHandlers();
    },
    generateCatalog() {
        if(this.products.length) {
            this.catalogBlock.innerHTML = '';
            this.products.forEach(product => this.catalogBlock.insertAdjacentHTML('beforeend', this.create(product)));
        }
        else this.catalogBlock.innerHTML = 'Каталог пуст';
    },
    create(product) {
        return `<div class = "product">
            <div><b>Наименование:</b> ${product.productName}</div>
            <div><b>Цена:</b> ${product.price}</div>
            <button class="add-to-cart" data-article-number="${product.articleNumber}">Добавить в корзину</button>
        </div>`;
    },
    addEventHandlers() {
        this.catalogBlock.addEventListener('click', event => this.addToCart(event));
    },
    addToCart(event) {
        if(!event.target.classList.contains('add-to-cart')) return;
        let articleNumber = +event.target.dataset.articleNumber;
        let productAdd = this.products.find((product) => product.articleNumber === articleNumber);
        this.cart.addToCart(productAdd);

    },
};


//КОРЗИНА

const cart = {
    container: null,
    clearCartButton: null,
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
            quantity: 3,
            price: 15000
        },
        {
            articleNumber: 981423,
            productName: 'шапка',
            quantity: 1,
            price: 1999
        }
    ],

    init() {
        this.container = document.querySelector(".cart");
        this.clearCartButton = document.querySelector(".cart-button");
        this.clearCartButton.addEventListener('click', () => this.clearCart());

        this.generateCart();
    },

    clearCart() {
        this.products = [];
        this.generateCart();
    },

    generateCart() {
        this.container.innerHTML = '';
        if (this.products.length) {
            this.products.forEach(product => this.container.insertAdjacentHTML('beforeend', this.create(product)));
            this.container.insertAdjacentHTML('beforeend', `В корзине ${this.cartQuantity()} товаров(a) на сумму: ${this.cartPrice()}`);
        }
        else this.container.innerHTML = 'Корзина пуста';
    },

    // findProductByArticleNumber(article) {
    //     return this.products.find((product) => product.articleNumber === article);
    // },
    //
    // findProductByName(name) {
    //     return this.products.filter((product) => product.productName === name);
    // },

    cartPrice() {
        return this.products.reduce((finalPrice, cartProduct) => finalPrice + cartProduct.quantity * cartProduct.price, 0);
    },

    cartQuantity() {
        return this.products.reduce((finalQuantity, cartProduct) => finalQuantity + cartProduct.quantity, 0);
    },

    addToCart(product) {
       let findInCart = this.products.find((item) => product.articleNumber === item.articleNumber);
        findInCart ? findInCart.quantity++ : this.products.push({...product,quantity: 1});

       cart.init();
    },

    create(product) {
        return `<div class = "product">
            <div><b>Наименование:</b> ${product.productName}</div>
            <div><b>Цена:</b> ${product.price}</div>
            <div><b>Количество:</b> ${product.quantity}</div>
            <div><b>Итого:</b> ${product.quantity * product.price}</div>
        </div>`;
    },
};

catalog.init('catalog', cart);
cart.init();