/**
 * Компонент со всеми элементами
 */

define('app/Components/Elements.js', ['app/Components/Component.js'], function (Component) {
    return class Elements extends Component {

        constructor(type) {
            super();
            this.type = type;
        }

        /**
         * Вызов и возвращение определенного типа рендера
         * @returns {string}
         */
        render() {
            let str;
            switch (this.type) {
                case "field":
                    str = this.renderField();
                    break;
                case "win":
                    str = this.renderWinScore();
                    break;
                case "lose":
                    str = this.renderLoseScore();
                    break;
                case "tie":
                    str = this.renderTieScore();
                    break;
                case "start":
                    str = this.renderStart();
                    break;
                case "informer":
                    str = this.renderInformer();
                    break;
                case "clearScore":
                    str = this.renderClearScore();
                    break;
                case "tic":
                    str = this.renderTic();
                    break;
                case "tac":
                    str = this.renderTac();
                    break;
            }
            return str;
        }

        /**
         * Рендер поля
         * @returns {string}
         */
        renderField() {
            let block = '';
            for (let i = 0; i < 9; i++) {
                block += `<div class="game__cell" data-cell="${i}"></div>`;
            }
            return block;
        }

        /**
         * Рендер строки с победой
         * @returns {string}
         */
        renderWinScore() {
            return `
                    <span class="score__result score__result_win">Победа!</span>
                    <span class="score__time"></span>
                `;
        }

        /**
         * Рендер строки с поражением
         * @returns {string}
         */
        renderLoseScore() {
            return `
                    <span class="score__result score__result_lose">Поражение</span>
                    <span class="score__time"></span>
                `;
        }

        /**
         * Рендер строки с ничьей
         * @returns {string}
         */
        renderTieScore() {
            return `
                    <span class="score__result score__result_tie">Ничья</span>
                    <span class="score__time"></span>
                `;
        }

        /**
         * Рендер окошка с выбором сложности, фигуры кнопкой старт
         * @returns {string}
         */
        renderStart() {
            return `
                <div class="game__option">
                    <p class="game__option-text">Сложность:</p>
                    <select class="game__option-diff">
                        <option>Легко</option>
                        <option>Средне</option>
                        <option>Сложно</option>
                    </select>
                </div>
                <div class="game__option">
                    <p class="game__option-text">Играть за:</p>
                    <select class="game__option-figure">
                        <option>Крестики</option>
                        <option>Нолики</option>
                    </select>
                </div>
                <a href="#" class="button button__game button__game_start">Начать игру</a>
            `;
        }

        /**
         * Рендер информатора
         * @returns {string}
         */
        renderInformer() {
            return `
                    <span class="game__time"></span>
                    <span class="game__score"></span>
                    <span class="game__step"></span>
                `;
        }

        /**
         * Рендер крестика
         * @returns {string}
         */
        renderTic() {
            return `<svg height="100" width="100">
                        <line class="tic" x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="3" />
                        <line class="tic" x1="90" y1="10" x2="10" y2="90" stroke="black" stroke-width="3" />
                    </svg>`;
        }

        /**
         * Рендер нолика
         * @returns {string}
         */
        renderTac() {
            return `<svg height="100" width="100">
                        <circle class="tac" cx="50" cy="50" r="40"/>
                    </svg> `;
        }
    }
});