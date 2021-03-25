/*
Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
 */

function plus(x,y) {
  return x + y;
}

function minus(x,y) {
  return x - y;
}

function product(x,y) {
  return x * y;
}

function division(x,y) {
  return x / y;
}

function mathOperation(arg1, arg2, operation) {
  switch(operation) {
    case '+': return plus(arg1,arg2);
    case '-': return minus(arg1,arg2);
    case '*': return product(arg1,arg2);
    case '/': return division(arg1,arg2);
    default: return 'Заданы неверные параметры';
  }
}
