class Match {
    constructor(player1) {
        this.player1 = player1;
        this.id = Match.NextId();
    }

    start() {
        this.player1.send('white');
        this.player2.send('black');

        this.player1.match = this;
        this.player2.match = this;

        this.status = 'started';
    }

    playMove(id, data) {
        let oppPlayer = id == 'white' ? this.player2 : this.player1;
        let oppColor = id == 'white' ? 'black' : 'white';
        console.log(`sending message to player ${oppColor}: ${data}`)
        oppPlayer.send(JSON.stringify({ data: data }));
    }

    finish() {
        this.status = 'finished';
    }
}

Match.Nr = 1;
Match.NextId = function() {
    return Match.Nr++;
}

module.exports = Match;