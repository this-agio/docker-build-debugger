
const shell = require('./shell')
const config = require('../shared/config')

function writeTmpFile(content, fnc) {
    tmp.file(function(err, path, fd) {
        if (err) throw err;
        fs.writeSync(fd, content)
        fnc(path)
    })
}

module.exports = {
    run: function(image) {
        var aShell = shell.create()
        aShell.send('docker run -ti ' + image + ' ' + config.step_command + '\r')

        return aShell
    },
    imageId: function() {
    }
}