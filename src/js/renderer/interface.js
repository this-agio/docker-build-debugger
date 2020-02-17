
const $ = require('jquery')

var interface = {
    debugBtn: $('#debug'),
    loader: $('#loader'),
    playBtn: $('#play'),
    editor: document.getElementById('editor'),
    terminal: document.getElementById('terminal-component'),
    enable: function(element) {
        element.removeClass('disabled')
    },
    disable: function(element) {
        element.addClass('disabled')
    },
    show: function(element) {
        element.removeClass('hide')
    },
    hide: function(element) {
        element.addClass('hide')
    }
}

module.exports = interface