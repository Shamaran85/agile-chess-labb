let moveArr = [];
/**
 * TODO
 * Add FEN to getRoom ---
 * Add function to check if_checkmate for id.
 * Add player-idn to getRoom.
 * On checkmate, add boolean to object.
 * Add function to get all played games between two ids, and returns results.
 * */
exports.getRoom = (id, move) => {
    let gameHistory = moveArr.find(game => id === game.gameId)
    if (gameHistory) {
        gameHistory.history.push(move.from, move.to, move.newFen, move.checkmate);
    } else {
        moveArr.push({
            history: [move.from, move.to, move.newFen, move.checkmate],
            gameId: id,
        })
    }
    console.log('te', JSON.stringify(moveArr))
}
