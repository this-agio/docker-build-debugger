
module.exports = function() {
    var breakpoints = []

    this.toggleBreakpointOn = function(line) {
        if(line < 1) {
            return
        }
        if(breakpoints.indexOf(line) < 0) {
            breakpoints.push(line)
        } else {
            breakpoints.splice(breakpoints.indexOf(line), 1)
        }
    }

    this.empty = function() {
        return breakpoints.length == 0
    }
    this.list = function() {
        breakpoints.sort()
        return [...breakpoints]
    }
}
