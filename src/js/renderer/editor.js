
//TODO: find a way to include from here (instead that in the index.html) the following files
//<link rel=stylesheet href="node_modules/codemirror/lib/codemirror.css">
//<link rel=stylesheet href="node_modules/codemirror/theme/dracula.css">

const CodeMirror = require('codemirror/lib/codemirror')
require('codemirror/mode/javascript/javascript')
require('codemirror/addon/mode/simple')
require('codemirror/mode/dockerfile/dockerfile')

breakpoint = require('../shared/breakpoint')

const $ = require('jquery')

function toggleBreakpointOn(element) {
    if(element.hasClass('breakpoint')) {
        element.removeClass('breakpoint')
    } else {
        element.addClass('breakpoint')
    }
}

module.exports = {
    provideOn: function(textAreaElement) {
        var cm = new CodeMirror.fromTextArea(
            textAreaElement, {
            lineNumbers: true,
              mode: 'dockerfile',
              theme: 'dracula'
        });

        $('.CodeMirror-linenumber').click(function() {
            if(!freezed) {
                breakpoint.toggleBreakpointOn(parseInt($(this).html()))
                toggleBreakpointOn($(this))
            }
        })

        var freezed = false

        return  {
            lines: function() {
                return cm.getValue().split('\n')
            },
            contentUntil: function(index) {
                cm.getValue().split('\n').slice(0, index).join('\n')
            },
            toggleFreeze: function() {
                freezed = !freezed
                cm.setOption("readOnly", !freezed ? false : "nocursor")
            }
        }
    }
}