function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntNot(min, max, not) {
    var z = not
    while (z == not) {
        z = getRandomInt(min, max)
    }
    return z
}