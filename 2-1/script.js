var a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2, так как инкремент перед переменной увеличивает ее значение до операции присваивания
d = b++; alert(d);           // 1, так как инкремент после переменной, сначала присваивает d значение b, а потом увеличивает b на 1
c = (2+ ++a); alert(c);      // 5, так как во второй строчке а уже равно двум, тут к двум прибавляется сперва увеличенная на 1 a. получается 5
d = (2+ b++); alert(d);      // 4, инкремент после b, равной после 3-й строчки двум. сначала выполняется код в строчке, только потом увеличивается b. 
alert(a);                    // 3, а увеличилась на 1 во второй и трейтьей строчке 1+1+1=3
alert(b);                    // 3, b увеличилась на 1 во второй и трейтьей строчке 1+1+1=3