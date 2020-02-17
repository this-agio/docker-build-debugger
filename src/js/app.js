
const { debugBtn,
        editor,
        terminal,
        loader,
        playBtn,
        enable,
        disable,
        show,
        hide } = require('./src/js/renderer/interface')
const editorProvider = require('./src/js/renderer/editor').provideOn
const terminalProvider = require('./src/js/renderer/terminal-component').provideOn

const debug = require('./src/js/main/debug')
const docker = require('./src/js/main/docker')

const piping = require('./src/js/shared/piping')

var breakpoint = require('./src/js/shared/breakpoint')
var newStepper = require('./src/js/shared/stepper').create
var config = require('./src/js/shared/config')

var anEditor = editorProvider(editor)
var terminalComponent = terminalProvider(terminal)

debugBtn.click(function() {
    anEditor.toggleFreeze()

    if(breakpoint.empty()) {
        terminalComponent.clear()
        terminalComponent.send('Please click on a line number to specify a breakpoint.\r\n')
        return
    }

    disable(debugBtn)
    var stepper = newStepper(
        breakpoint.list(),
        function(index) {
            show(loader)
            var d = debug.debuggerFor(anEditor.lines())
            var imageId = d.imageAt(index, function(image) {
                terminalComponent.clear()
                terminalComponent.send('Executing "' + config.step_command + '" into ' + image + ' image.\r\n' )
                var container = docker.run(image)
                hide(loader)
                enable(playBtn)
                piping.pipe(container, terminalComponent)
            })
            return function() {
                container.kill()
                terminalComponent.dispose()
            }
        }, function() {
            enable(debugBtn)
            disable(playBtn)
            hide(loader)
            anEditor.toggleFreeze()
        })

    stepper.next()

    playBtn.click(function() {
        stepper.next()
    })
})