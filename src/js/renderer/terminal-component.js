
const xterm = require('xterm')
const xtermAddonFit = require('xterm-addon-fit')

module.exports = {
    provideOn: function(element) {
        var term = new xterm.Terminal()
        term.open(element)
        var fitAddon = new xtermAddonFit.FitAddon();
        term.loadAddon(fitAddon)
        fitAddon.fit()

        window.addEventListener("resize", function() {
            fitAddon.fit()
        })

        return {
            out: function(fnc) { term.onData(fnc) },
            send: function(data) { term.write(data) },
            clear: function() { term.clear() }
        }
    }
}