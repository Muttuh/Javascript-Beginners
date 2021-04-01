// 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.

let i = 0;
while(i <= 100) {
    switch(i) {
        case 0:
            break;
        case 1:
            document.writeln(i);
            break;
        case 2:
            document.writeln(i);
            break;
        default:
            if(isSimple(i) == true) document.writeln(i);
    }
    i++;
}

function isSimple(x) {
        for (let i = 2; i < x; i++) {
            if (x % i === 0) return false;
        }
        return true;
    }
