/**
 * Основной обработчик
 */

define('app/Controllers/MainHandler.js', [
    'app/Components/Elements.js',
    'app/Helpers/UsefulFunction.js'
], function (Elements, Helper) {

    class MainHandler {

        constructor() {
            this.elem = {};

            this.playerOptions = {
                figure: '',
                difficult: 0
            };
            this.computerFigure;
            this.score = {
                computer: 0,
                player: 0
            };

            this.currentPlayer = Helper.random(2);
        }

        /**
         * Поиск и создание элементов
         */
        init() {
            this.elem.gameUI = document.querySelector('.game');
            this.elem.scoreUI = document.querySelector('.score');
            this.elem.startUI = document.querySelector('.game__start');
            this.elem.startUI = Helper.insertElement('div', this.elem.gameUI, 'game__start', (new Elements("start")));

            let buttonStart = this.elem.startUI.querySelector('.button');
            buttonStart.addEventListener("click", () => {
                let dif = this.elem.startUI.querySelector('.game__option-diff').selectedIndex;
                if (dif === 0) this.playerOptions.difficult = 11;
                if (dif === 1) this.playerOptions.difficult = 6;
                if (dif === 2) this.playerOptions.difficult = 1;
                let figure = this.elem.startUI.querySelector('.game__option-figure').selectedIndex;
                if (figure == 0) {
                    this.playerOptions.figure = new Elements("tic");
                    this.computerFigure = figure = new Elements("tac");
                } else {
                    this.playerOptions.figure = new Elements("tac");
                    this.computerFigure = figure = new Elements("tic");
                }
                this.elem.startUI.classList.add('hide');
                this.start();
            });
        }

        /**
         * Проверка победных комбинаций
         * @param player - у кого првоеряем, 1 - игрок, 2 - компьютер
         * @param arr - где проверяем
         * @returns {boolean}
         */
        checkWinner(player, arr) {
            return (arr[0] === player && arr[1] === player && arr[2] === player) ||
                (arr[3] === player && arr[4] === player && arr[5] === player) ||
                (arr[6] === player && arr[7] === player && arr[8] === player) ||
                (arr[0] === player && arr[3] === player && arr[6] === player) ||
                (arr[1] === player && arr[4] === player && arr[7] === player) ||
                (arr[2] === player && arr[5] === player && arr[8] === player) ||
                (arr[0] === player && arr[4] === player && arr[8] === player) ||
                (arr[2] === player && arr[4] === player && arr[6] === player);
        }

        /**
         * Обработчик хода компьютера
         * @returns {Promise<void>}
         */
        async computerStep() {

            /**
             * Рандомное число для сложности
             * Легко от 0 до 10
             * Средне от 0 до 5
             * Сложно 0
             */
            let dif = Helper.random(this.playerOptions.difficult);

            let newArr = this.elem.field;
            let bestStep = -1;

            // Проверка на выигрыш компьютера или игрока
            for (let k = 1; k < 3; k++) {
                for (let i = 0; i < 9; i++) {
                    if (newArr[i] === 0) {
                        let bufArr = newArr.map((x) => x);
                        bufArr[i] = 3 - k;
                        if (this.checkWinner(3 - k, bufArr)) {
                            bestStep = i;
                            if (dif > 6 && k == 2) // если проверяется выигрыш игрока и сложность легкая то обнуляем лучший ход
                                bestStep = -1;
                        }
                    }
                }
            }

            // Если лучший ход не найден проверяем есть ли выигрышные ходы по вертикали и горизонтали
            if (bestStep == -1) {

                let indexComputer = [], i;
                for (i = 0; i < newArr.length; i++) if (newArr[i] === 2) indexComputer.push(i);
                let index1, index2;
                indexComputer.forEach((index) => {

                    // находим клетки по вертикали
                    if ([0, 1, 2].includes(index)) {
                        index1 = index + 3;
                        index2 = index + 6;
                    }
                    if ([3, 4, 5].includes(index)) {
                        index1 = index - 3;
                        index2 = index + 3;
                    }
                    if ([6, 7, 8].includes(index)) {
                        index1 = index - 3;
                        index2 = index - 6;
                    }

                    // Проверяем на пустоту найденные клетки
                    if (newArr[index1] == 0 && newArr[index2] == 0) {
                        if (dif == 0) { // если сложность = 0, то записываем в лучший ход дальную точку
                            (Math.abs(index1 - index) > Math.abs(index2 - index)) ? bestStep = index1 : bestStep = index2;
                        } else { // иначе ближайшую
                            (Math.abs(index1 - index) < Math.abs(index2 - index)) ? bestStep = index1 : bestStep = index2;
                        }
                    }

                    // находим клетки по горизонтали если не найден по вертикали или c вероятностью с 50%
                    if (Helper.random(100) > 50 || bestStep == -1) {
                        if ([0, 3, 6].includes(index)) {
                            index1 = index + 1;
                            index2 = index + 2;
                        }
                        if ([1, 4, 7].includes(index)) {
                            index1 = index - 1;
                            index2 = index + 1;
                        }
                        if ([2, 6, 8].includes(index)) {
                            index1 = index - 1;
                            index2 = index - 2;
                        }
                    }

                    // Также проверяем на пустоту
                    if (newArr[index1] == 0 && newArr[index2] == 0) {
                        if (dif == 0) {
                            (Math.abs(index1 - index) > Math.abs(index2 - index)) ? bestStep = index1 : bestStep = index2;
                        } else {
                            (Math.abs(index1 - index) < Math.abs(index2 - index)) ? bestStep = index1 : bestStep = index2;
                        }
                    }

                });
            }

            // Если все еще не найден лучший ход, то делаем след. проверки
            if (bestStep === -1) {
                let bestSteps = [];
                if (newArr.every(item => item == 0)) { // проверка, если ход компьютера первый

                    if (dif === 0) bestSteps = [4];
                    if (dif > 0 && dif < 6) bestSteps = [0, 2, 6, 8];
                    if (dif > 6) bestSteps = [0, 1, 2, 3, 5, 7, 6, 8];

                } else if ((newArr.includes(1) && !newArr.includes(2)) && dif == 0) { // проверка, если это первый ход после хода игрока, а также если сложность = 0
                    let indexComputer = newArr.indexOf(1);
                    if (indexComputer === 4) {
                        bestSteps = [0, 2, 6, 8];
                    } else {
                        bestSteps = [4];
                    }
                } else { // если все првоерки не прошли, находим лучший ход рандомным способом среди пустых клеток
                    for (let i = 0; i < newArr.length; i++)
                        if (newArr[i] === 0) bestSteps.push(i);
                }
                bestStep = bestSteps[Helper.random(bestSteps.length)];
            }

            // сон перед ходом
            await Helper.sleep(Helper.random(2000));

            //
            this.elem.field[bestStep] = 2;
            this.elem.cells.forEach((item) => {
                if (item.dataset.cell == bestStep) {
                    Helper.insertElement('div', item, 'tictac', this.computerFigure);
                }
            });
            this.togglePlayer();
        }

        /**
         * Обработчик хода игрока
         * @param e
         */
        playerStep(e) {
            if ((e.target.className === "game__cell") && (e.target.firstChild === null)) {
                Helper.insertElement('div', e.target, 'tictac', inst.playerOptions.figure);
                inst.elem.field[e.target.dataset.cell] = 1;
                inst.togglePlayer();
            }
        }

        /**
         * Смена текущего игрока и проверка на победу
         */
        togglePlayer() {
            let win = this.checkWinner(this.currentPlayer + 1, this.elem.field);
            let tie = !this.elem.field.includes(0);
            if (win || tie) {
                if (win) (this.currentPlayer === 0) ? this.score.player++ : this.score.computer++;
                if (!win) this.currentPlayer = 2;
                this.informer(2, this.score);
                this.elem.fieldUI.removeEventListener("click", this.playerStep);
                this.elem.startUI.classList.remove('hide');
                this.elem.startUI.style.flexDirection = "row";
                this.elem.startUI.style.justifyContent = "space-around";
                this.elem.gameUI.appendChild(this.elem.startUI);
            } else if (this.currentPlayer == 0) {
                this.currentPlayer = 1;
                this.informer(0);
                this.elem.fieldUI.removeEventListener("click", this.playerStep);
                this.computerStep();
            } else {
                this.currentPlayer = 0;
                this.informer(0);
                this.elem.fieldUI.addEventListener("click", this.playerStep);
            }
        }

        /**
         * Начало игры
         */
        start() {
            if (this.elem.informUI === undefined) {
                this.elem.informUI = Helper.insertElement('div', this.elem.gameUI, 'game__informer', (new Elements("informer")));
                this.elem.fieldUI = Helper.insertElement('div', this.elem.gameUI, 'game__field', (new Elements("field")));
            } else {
                let cells = this.elem.fieldUI.querySelectorAll('.game__cell');
                cells.forEach((cell) => {
                    cell.innerHTML = "";
                });
            }
            this.elem.cells = this.elem.fieldUI.querySelectorAll('.game__cell');
            this.elem.field = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.informer(1, this.score);
            this.togglePlayer();
        }

        /**
         * Информатор
         * @param state 1 - включить таймер, 2 - выключить таймер
         * @param score очки игроков
         */
        informer(state, score) {
            let timeUI = this.elem.informUI.querySelector('.game__time');
            let scoreUI = this.elem.informUI.querySelector('.game__score');
            let stepUI = this.elem.informUI.querySelector('.game__step');
            let seconds = 0;

            if (state === 1) {
                timeUI.innerText = `Время: ${seconds}s`;
                this.elem.timer = setInterval(() => {
                    seconds++;
                    timeUI.innerText = `Время: ${seconds}s`;
                }, 1000);
            }
            if (state === 2) {
                clearInterval(this.elem.timer);
                if (this.elem.scoreUI.querySelector('.score__block_empty') !== null) this.elem.scoreUI.querySelector('.score__block_empty').remove();
                let block;
                if (this.currentPlayer == 0) block = Helper.insertElement('div', this.elem.scoreUI, 'score__block', (new Elements("win")));
                if (this.currentPlayer == 1) block = Helper.insertElement('div', this.elem.scoreUI, 'score__block', (new Elements("lose")));
                if (this.currentPlayer == 2) block = Helper.insertElement('div', this.elem.scoreUI, 'score__block', (new Elements("tie")));
                if (this.elem.scoreUI.childElementCount >= 12) this.elem.scoreUI.children[1].remove();
                block.querySelector('.score__time').innerText = timeUI.innerText;
            }

            if (score !== undefined) {
                scoreUI.innerText = `Счет ${score.player}:${score.computer}`;
            }

            if (this.currentPlayer === 0) {
                stepUI.innerText = `Ваш ход`;
            } else {
                stepUI.innerText = `Ход противника`;
            }
        }
    }

    const inst = new MainHandler();
    return inst;

});
