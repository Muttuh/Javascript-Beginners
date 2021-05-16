// const settings = {
//     rows: 10,
//     cols: 10,
//     startPositionX: 0,
//     startPositionY: 0,
//     startDirection: 'right',
//     stepsPerSecond: 5,
//     playerColor: '#aa3333',
//     cellsColor: '#eee',
//
//     winFoodCount: 50,
// };
//
// const player = {
//     x: null,
//     y: null,
//     direction: null,
//
//     setDirection(direction) {
//         this.direction = direction;
//     },
//     init(startX, startY, startDirection) {
//       this.x = startX;
//       this.y = startY;
//       this.setDirection(startDirection);
//     },
//     makeStep() {
//       let nextCell = this.getNextStepCell();
//
//       this.x = nextCell.x;
//       this.y = nextCell.y;
//     },
//     getNextStepCell() {
//         const cell = {
//             x: this.x,
//             y: this.y,
//         };
//
//         switch(this.direction) {
//             case 'up':
//                 cell.x--;
//                 break;
//             case 'down':
//                 cell.x++;
//                 break;
//             case 'right':
//                 cell.y++;
//                 break;
//             case 'left':
//                 cell.y--;
//                 break;
//         }
//
//         return cell;
//     }
// };
//
// const game = {
//     settings,
//     player,
//     containerElement: null,
//     cellElements: [],
//
//     run() {
//       this.init();
//       this.render();
//
//       setInterval(()=>{
//           if(this.canPlayerMakeStep()) {
//               this.player.makeStep();
//               this.render();
//           }
//       }, 1000 / this.settings.stepsPerSecond)
//     },
//
//     init() {
//       this.player.init(
//         this.settings.startPositionX,
//         this.settings.startPositionY,
//         this.settings.startDirection);
//
//       this.containerElement = document.querySelector('#game');
//       this.initCells();
//       this.initEventHandlers();
//     },
//
//     initCells() {
//       this.containerElement.innerHTML = '';
//       this.cellElements = [];
//
//       for(let row = 0; row < this.settings.rows; row++) {
//           const trElem = document.createElement('tr');
//           this.containerElement.appendChild(trElem);
//           for(let coll = 0; coll < this.settings.cols; coll++) {
//             const collElem = document.createElement('td');
//             trElem.appendChild(collElem);
//             this.cellElements.push(collElem);
//           }
//       }
//     },
//
//     initEventHandlers() {
//         document.addEventListener('keydown',event => this.keyDownHandler(event));
//     },
//
//     keyDownHandler(event) {
//       switch(event.code) {
//           case 'ArrowUp':
//           case 'KeyW':
//               this.player.setDirection('up');
//               break;
//           case 'ArrowDown':
//           case 'Keys':
//               this.player.setDirection('down');
//               break;
//           case 'ArrowRight':
//           case 'KeyD':
//               this.player.setDirection('right');
//               break;
//           case 'ArrowLeft':
//           case 'KeyS':
//               this.player.setDirection('left');
//               break;
//       }
//     },
//
//     render() {
//       this.cellElements.forEach(cell => cell.style.backgroundColor = this.settings.cellsColor);
//
//       const playerCell = document
//           .querySelector(`tr:nth-child(${this.player.x+1})`)
//           .querySelector(`td:nth-child(${this.player.y+1})`);
//
//       playerCell.style.backgroundColor = this.settings.playerColor;
//     },
//
//     canPlayerMakeStep() {
//         const stepPoint = this.player.getNextStepCell();
//
//         return stepPoint.x >= 0 &&
//                stepPoint.x < this.settings.rows &&
//                stepPoint.y >= 0 &&
//                stepPoint.y < this.settings.cols;
//     }
//
//
//
// };

const settings = {
    cols: 21,
    rows: 21,
    speed: 2,
    foodToWin: 50,
};

const config = {
    settings,

    init(userSettings) {
        Object.assign(this.settings, userSettings)
    },

    getColsCount() {
        return this.settings.cols;
    },
    getRowsCount() {
        return this.settings.rows;
    },
    getSpeed() {
        return this.settings.speed;
    },
    getFoodToWin() {
        return this.settings.foodToWin;
    },

    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки. Число колонок должно быть в диапазоне от 10 до 30');
        }
        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки. Число столбцов должно быть в диапазоне от 10 до 30');
        }
        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки. Скорость должна быть в диапазоне от 1 до 10');
        }
        if (this.getFoodToWin() < 5 || this.getFoodToWin() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки. Число еды должно быть в диапазоне от 5 до 50');
        }

        return result;
    },


};

const map = {
    cells: null,
    usedCells: [],
    blocks: [],

    init(rows, cols) {
        const table = document.querySelector('#game');
        table.innerHTML = '';

        this.cells = {};
        for (let col = 0; col < cols; col++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let row = 0; row < rows; row++) {
                const td = document.createElement('td');
                td.classList.add('cell');
                this.cells[`x${col}_y${row}`] = td;
                tr.appendChild(td);
            }
        }
    },

    render(snakeArray, foodCell) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }
        this.usedCells = [];

        snakeArray.forEach((cell, index) => {
            const snakeCell = this.cells[`x${cell.x}_y${cell.y}`];
            snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        const foodPoint = this.cells[`x${foodCell.x}_y${foodCell.y}`];
        foodPoint.classList.add('food');
        this.usedCells.push(foodPoint);
    },
};

const snake = {
    config,
    body: [],
    direction: null,
    lastStepDirection: null,

    init(startBody, direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
    },
    getBody() {
        return this.body;
    },
    getDirection() {
        return this.lastStepDirection;
    },
    setDirection(direction) {
        this.direction = direction;
    },
    isOnPoint(point) {
        return this.getBody().some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y);
    },
    makeStep() {
        this.lastStepDirection = this.direction;
        this.getBody().unshift(this.getNextHeadStep());
        this.getBody().pop();
    },
    growUp() {
        const lastBodyPoint = this.getBody()[this.getBody().length - 1];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);
        this.getBody().push(lastBodyPointClone);
    },
    getNextHeadStep() {
        const next = {
            x: null,
            y: null,
        };
        const firstPoint = this.getBody()[0];
        switch (this.direction) {
            case 'up':
                next.x = firstPoint.x-1;
                next.y = firstPoint.y;
                break;
            case 'down':
                next.x = firstPoint.x+1;
                next.y = firstPoint.y;
                break;
            case 'right':
                next.x = firstPoint.x;
                next.y = firstPoint.y+1;
                break;
            case 'left':
                next.x = firstPoint.x;
                next.y = firstPoint.y-1;
        }
        return this.changeFieldPlace(next);
    },
    changeFieldPlace(point) {
            if (point.x >= this.config.getColsCount())  point.x = 0;
            if (point.y >= this.config.getRowsCount())  point.y = 0;
            if (point.x < 0)  point.x = this.config.getColsCount() - 1;
            if (point.y < 0)  point.y = this.config.getRowsCount() - 1;

            return point;
        },
};

const food = {
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};

const brick = {
    place = [],

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    render(this.getCoordinates(),2) {
         
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};

const status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },
    setStopped() {
        this.condition = 'stopped';
    },
    setFinished() {
        this.condition = 'finished';
    },
    isPlaying() {
        return this.condition === 'playing';
    },
    isStopped() {
        return this.condition === 'stopped';
    },
};

const game = {
    settings,
    config,
    map,
    snake,
    food,
    status,
    tickInterval: null,

    init(userSettings = {}) {
        this.config.init(userSettings);
        const validation = this.config.validate();

        if (!validation.isValid) {
            for (const err of validation.errors) {
                console.error(err);
            }
            return;
        }
        this.map.init(this.config.getRowsCount(), this.config.getColsCount());
        this.setEventHandlers();
        this.reset();
    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'right');
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        this.render();
    },

    getStartSnakeBody() {
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            }
        ];
    },

    getRandomFreeCoordinates() {
        const exclude = [this.food.getCoordinates(), ...this.snake.getBody()];

        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };
            if (!exclude.some(point => rndPoint.x === point.x && rndPoint.y === point.y)) return rndPoint;
        }
    },

    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');
    },
    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButton('Игра закончена', true);
    },
    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },
    setPlayButton(textContent, isDisabled = false) {
        const playButton = document.getElementById('playButton');
        playButton.textContent = textContent;

        isDisabled
            ? playButton.classList.add('disabled')
            : playButton.classList.remove('disabled');
    },
    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();
        });
        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameHandler();
        });
        document.addEventListener('keydown', event => this.keyDownHandler(event));
    },

    keyDownHandler(event) {
        if(!this.status.isPlaying()) return;

        const direction = this.getDirection(event.code);

        if (this.canSetDirection(direction)) this.snake.setDirection(direction);
    },
    getDirection(code) {
        switch(code) {
          case 'ArrowUp':
          case 'KeyW':
              return 'up';
          case 'ArrowDown':
          case 'Keys':
              return 'down';
          case 'ArrowRight':
          case 'KeyD':
              return 'right';
          case 'ArrowLeft':
          case 'KeyS':
              return 'left';
      }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },

    playClickHandler() {
        if (this.status.isPlaying()) this.stop();
        else if (this.status.isStopped()) this.play();
    },
    newGameHandler() {
        this.reset();
    },
    render() {
        this.map.render(this.snake.getBody(), this.food.getCoordinates());
    },

    tickHandler() {
        if(!this.canMakeStep()) return this.finish();
        if(this.food.isOnPoint(this.snake.getNextHeadStep())) {
            this.snake.growUp();
            this.food.setCoordinates(this.getRandomFreeCoordinates());
            if(this.isGameWon()) this.finish();
        }
        this.snake.makeStep();
        this.render();
        this.scoreCount();
    },

    isGameWon() {
        return this.snake.getBody().length > this.config.getFoodToWin();
    },

    canMakeStep: function () {
        const nextHeadPoint = this.snake.getNextHeadStep();

        return !this.snake.isOnPoint(nextHeadPoint);
        //     &&
        // nextHeadPoint.x < this.config.getColsCount() &&
        // nextHeadPoint.y < this.config.getRowsCount() &&
        // nextHeadPoint.x >= 0 &&
        // nextHeadPoint.y >= 0;


    },

    scoreCount() {
        const div = document.querySelector('#score');
        div.innerHTML = '';
        div.innerHTML += this.snake.getBody().length - 1;
    }

};

game.init({rows: 20, cols: 20});
