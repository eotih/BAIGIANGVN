function getPrice(value) {
    return value.map(function (item) {
        return item.price - (item.price * item.sale / 100);
    });
}
function getPriceCombos(value) {
    return value.map(function (item) {
        return item.price
    }).reduce(function (a, b) {
        return a + b;
    }, 0);
}
module.exports = { getPrice, getPriceCombos };