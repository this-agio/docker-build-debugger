
const fs = require('fs')
const child_process = require('child_process')
const tmp = require('tmp')

function createDebugger(lines) {
    return {
        imageAt: function(index, imageCallBack) {
            tmp.file(function(err, path, fd) {
                if (err) throw err;
                fs.writeSync(fd, lines.slice(0, index).join('\n'))
                console.log('docker build -f ' + path + ' .')
                child_process.exec('docker build -f ' + path + ' .', (error, stdout, stderr) => {
                    var images = stdout.split('\n')
                        .map(it => it.match(' ---> ([^\\s]*)$') || [])
                        .filter(it => it.length>0)
                        .map(it => it[1])
                    console.log(images)
                    console.log(index)
                    imageCallBack(images[index-1])
                })
             })
        }
    }
}

module.exports = {
    debuggerFor(lines) {
        return createDebugger(lines)
    }
}