function rotateRight(arr) {
    // Rotates 2D array clockwise 90 degrees
    // https://stackoverflow.com/a/58668351
    return arr[0].map(
        (v, i) => arr.map(
            row => row[i])
        .reverse()
    )
}

module.exports = {
    rotateRight
};