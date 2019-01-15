const Chess = require('chess.js').Chess;

let moveArr = [
    [{ "history": ["e2", "e4", "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1", false, "e7", "e5", "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2", false], "gameId": "1", "players": [{ "id": 1, "name": "Player1" }, { "id": 2, "name": "Player2" }] }],
    [{ "history": ["e2", "e4", "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1", false, "e4", "e6", "rnb1k1nr/pppp1ppp/8/2b1p3/4P3/2PP4/PP1B1qPP/RN1QKBNR w KQkq - 0 5", true], "gameId": "12", "players": [{ "id": 1, "name": "Player1" }, { "id": 2, "name": "Player2" }] }],
    [{ "history": ["e2", "e4", "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1", false, "e3", "e5", "rnbqkbnr/pp3Qpp/3p4/2p1p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4", true], "gameId": "2", "players": [{ "id": 1, "name": "Player1" }, { "id": 2, "name": "Player2" }] }],
    [{ "history": ["e2", "e4", "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1", false, "e3", "e5", "rnbqkbnr/pp3Qpp/3p4/2p1p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4", true], "gameId": "22", "players": [{ "id": 2, "name": "Player1" }, { "id": 3, "name": "Player2" }] }]];

exports.getRoom = (id, move) => {
    let gameHistory = moveArr.find(game => id === game.gameId)
    if (gameHistory) {
        gameHistory.history.push(move.from, move.to, move.newFen, move.checkmate);
    } else {
        moveArr.push({
            history: [move.from, move.to, move.newFen, move.checkmate],
            gameId: id,
            players: move.mockPlayers

        })
    }
}
exports.getHistory = (ids) => {
    const his = moveArr.filter((ob) => {
        let found = true;
        for (let i in ob[0].players) {
            const id = ob[0].players[i].id;
            if (ids.includes(id) === false) {
                found = false;
            }
        }
        return found;
    });

    const playerHistory = [...his] // Get all matches played with id1 and id2
    console.log('phis', playerHistory);

    const result = playerHistory.map((game) => {
        const h = game[game.length - 1].history
        const fen = h[h.length - 2]
        const chess = new Chess(fen);
        let winner = null;
        const checkmate = chess.in_checkmate();
        if (checkmate) {
            winner = chess.turn();
        }
        console.log("fsfsdf", winner)
        // const last = game.history[game.history.length - 1] // last game
        return winner;
    }).filter((game) => game)
    console.log(result);
    return result;
}