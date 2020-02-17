
module.exports = {
    pipe: function(first, second) {
        first.out((data) => { second.send(data) })
        second.out((data) => { first.send(data) })
    }
}