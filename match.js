class Match {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    start() {
        this.player1.send('white');
        this.player2.send('black');
    }
}    

module.exports = Match;