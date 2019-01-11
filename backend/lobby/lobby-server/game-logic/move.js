let moveArr = [];
/**
 * TODO
 * Add FEN to getRoom
 * Add function to check if_checkmate for id.
 * Add player-idn to getRoom.
 * On checkmate, add boolean to object.
 * Add function to get all played games between two ids, and returns results.
 * */
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
