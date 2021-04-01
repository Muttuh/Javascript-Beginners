// a) Организовать такой массив для хранения товаров в корзине;
// b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.

const cart = [
    ['футболка',2,1345],
    ['кроссовки',1,6799],
    ['куртка',1,15000],
    ['шапка',1,1999]
];

function countBasketPrice(arr) {
    let result = 0;

    for(let i = 0; i < arr.length; i++) {
        result += arr[i][1] * arr[i][2];
    }

    return (result);
}

console.log(countBasketPrice(cart));