/**
 * Функции сон, рандом, создать и вставить элемент
 */
define('app/Helpers/UsefulFunction.js', function () {

    return {

        /**
         * Функция задержки, возвращает промис
         * @param ms
         * @returns {Promise<unknown>}
         */
        sleep: function (ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        /**
         * Функция рандома
         * @param max
         * @returns {number}
         */
        random: function (max) {
            return Math.floor(Math.random() * Math.floor(max));
        },

        /**
         * Функция для создания и вставки элемента, возвращает созданный элемент
         * @param atr - тег элемента
         * @param to - куда вставляем элемент
         * @param className - класс элемента
         * @param body - тело элемента
         * @returns {any}
         */
        insertElement: function (atr, to, className, body) {
            let elem = document.createElement(atr);
            elem.className = className;
            elem.innerHTML = body;
            to.appendChild(elem);
            return elem;
        }
    }
});