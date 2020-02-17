

const os = require('os')
const pty = require('node-pty')

const shellCmd = os.platform() === 'win32' ? 'powershell.exe' : 'bash'

module.exports = {
    create: function() {
        var ptyProcess = pty.spawn(shellCmd, [], {
          name: 'xterm-color',
          cols: 80,
          rows: 30,
          cwd: process.env.HOME,
          env: process.env
        });

        return {
            out: function(fnc) {
                ptyProcess.on('data', fnc)
            },
            send: function(data) {
                ptyProcess.write(data)
            },
            kill: function() {
                ptyProcess.kill()
            }
        }
    }
}