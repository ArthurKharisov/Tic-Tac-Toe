'use strict';
requirejs(['app/Controllers/MainPage.js', 'app/Controllers/MainHandler.js'], function (Page, Handler) {
    document.body.innerHTML = new Page();
    Handler.init();
});