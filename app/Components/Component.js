/**
 * Компонент родитель
 */

define('app/Components/Component.js', function () {

    return class Component {

        constructor() {

        }

        /**
         * Вызов рендера при переводе класса в строку
         * @returns {string}
         */
        toString() {
            return this.render();
        }

        /**
         * Рендер компонента
         * @returns {string}
         */
        render() {}
    }

});
