/**
 * Главная страница
 */
define('app/Controllers/MainPage.js', function (Component) {

    return class MainPage extends Component {

        constructor() {
            super();
        }

        /**
         * Рендер страницы
         * @returns {string}
         */
        render() {
            return (`
               <div class="wrapper">
                <div class="header header_position">
                    <h2 class="header__title">Крестики нолики</h2>
                </div>
                <div class="content content_position">
                    <div class="game game_position">
                        <div class="game__start"></div>
                    </div>
                    <div class="score score_position">
                        <h2 class="score__title">10 последних игр</h2>
                        <div class="score__block score__block_empty">Пусто</div>
                    </div>
                </div>
            </div>
            `);
        }

    }

});

