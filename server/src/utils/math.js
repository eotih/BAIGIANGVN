function getPrice(value) {
    return value.map((array) => array.price).reduce((total, lesson) => {
        return total + lesson;
    }, 0);
}
module.exports = { getPrice };