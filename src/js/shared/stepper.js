
module.exports = {
    create: function(breakpoints, stepperFnc, stopFnc) {
        var i=0
        var disposeFnc = () => {}
        return {
            next: function() {
                disposeFnc()
                if(i >= breakpoints.length) {
                    stopFnc()
                    return
                }

                disposeFnc = stepperFnc(breakpoints[i++])
            }
        }
    }
}