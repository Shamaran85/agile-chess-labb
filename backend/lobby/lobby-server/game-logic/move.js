let moveArr = [];
exports.getRoom = (id, move) => {
    let oldMoves = {
        from: move.from,
        to: move.to
    };

    moveArr.push(oldMoves)

    let gameHistory = {
        gameId: id,
        moves: moveArr
    }

    return console.log("getRoom", gameHistory)
}