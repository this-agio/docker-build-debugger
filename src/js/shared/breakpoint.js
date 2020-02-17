
var breakpoints = []

module.exports =  {
    toggleBreakpointOn: function(line) {
        if(breakpoints.indexOf(line) < 0) {
            breakpoints.push(line)
        } else {
            breakpoints.splice(breakpoints.indexOf(line), 1)
        }
    },
    empty: function() {
        return breakpoints.length == 0
    },
    list: function() {
        breakpoints.sort()
        return [...breakpoints]
    }
}